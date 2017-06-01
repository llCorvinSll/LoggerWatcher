import Rx from "rxjs";
import {ItemWrapper, LogLevel, runListner} from "../server/server";
import Dexie from "@node/dexie";


interface Filter {
    tag: string;
    level:LogLevel;
    ip:string;
}

export interface Page {
    items:ItemWrapper[];
    page:number;
    pages_count:number;
}

const PAGE_SIZE = 5;


const db = new Dexie("VisionLogs");
db.version(1).stores({logs: '++id'});
db.table("logs").clear();

class Storage {

    getFilter():void {
        return this.filter;
    }

    get TotalPages():number {
        return this.pages_count;
    }

    get TotalRows():number {
        return this.rows_count;
    }

    setPage(page:number):void {
        this.current_page_rx.next(page);
    }

    getRx():Rx.Observable<ItemWrapper[]> {
        this.table = db.table("logs");

        this.server_subscription = runListner()
            .map((obj:any) => Rx.Observable.fromPromise(this.table.add(obj)))
            .concatAll()
            .map((id:number) => {
                this.rows_count++;

                return id;
            });

        this.current_page_rx.map((page:number) => {
            this.is_autoscroll = false;

            return page;
        }).distinctUntilChanged().combineLatest(this.server_subscription, (page:number, id:number) => {
            let cur_page = page;

            let auto_scroll = this.is_autoscroll;

            if(cur_page === this.pages_count) {
                auto_scroll = true;
            }

            this.pages_count = Math.ceil(this.rows_count / PAGE_SIZE);

            if (auto_scroll) {
                cur_page = this.pages_count;
            }

            if (this.first_id === void 0) {
                this.first_id = id;
            }

            this.table.offset((cur_page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray((array:ItemWrapper[]) => {
                this.is_autoscroll = auto_scroll;

                this.logs_page.next({
                    items: array,
                    page: cur_page,
                    pages_count: this.pages_count
                })
            })


        }).subscribe();


        return this.logs_page;
    }

    private logs_page:Rx.BehaviorSubject<Page> = new Rx.BehaviorSubject({
        page: 1,
        items: []
    });

    private filter: Rx.BehaviorSubject<Filter> = new Rx.BehaviorSubject({
        tag: "",
        level: LogLevel,
        ip:""
    });

    private is_autoscroll:boolean = false;

    private table:Dexie.Dexie.Table;

    private rows_count:number = 0;

    private pages_count:number = 1;

    private current_page_rx:Rx.BehaviorSubject<number> = new Rx.BehaviorSubject(1);

    private first_id:number;

    private server_subscription:Rx.Subscription;
}



var STORAGE = new Storage();

export default STORAGE;