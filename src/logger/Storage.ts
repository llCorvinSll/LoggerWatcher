import Rx from "@node/rxjs";
import {ItemWrapper, LogLevel, runListner} from "../server/server";
import Dexie from "@node/dexie";


export interface Filter {
    tag: string;
    level?:LogLevel;
    ip:string;
}

export interface Page {
    items:ItemWrapper[];
    page:number;

    total_rows:number;
    filtered_rows:number;

    pages_count:number;

    filter: Filter;
}

const PAGE_SIZE = 200;


class Storage {

    getFilter():void {
        return this.filter;
    }

    setPage(page:number):void {
        this.current_page_rx.next(page);
    }

    setFilter(filter:Filter):void {
        this.filter.next(filter);
    }

    getRx():Rx.Observable<ItemWrapper[]> {
        this.init().then(() => {
            this.setupRx();
        });

        return this.logs_page;
    }

    private setupRx():void {
        this.server_subscription = runListner()
            .map((obj:any) => Rx.Observable.fromPromise(this.table.add(obj)))
            .concatAll()
            .map((id:number) => {
                this.rows_count++;

                return id;
            }).combineLatest(this.filter, (id:number, filter:Filter) => {
                let promise = this.applyFilter(filter).count();

                return Rx.Observable.fromPromise(promise.then((count:number) => {
                    return {
                        rows_count: count,
                        filter: filter
                    };
                }));
            })
            .concatAll();


        this.current_page_rx.map((page:number) => {
            this.is_autoscroll = false;

            return page;
        }).distinctUntilChanged().combineLatest(this.server_subscription, (page:number, filtred_data:any) => {
            let {rows_count, filter} = filtred_data;

            let cur_page = page;

            let auto_scroll = this.is_autoscroll;

            if (cur_page === this.pages_count) {
                auto_scroll = true;
            }

            this.pages_count = Math.ceil(rows_count / PAGE_SIZE);

            if (auto_scroll) {
                cur_page = this.pages_count;
            }

            this.applyFilter(filter).offset((cur_page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray((array:ItemWrapper[]) => {
                this.is_autoscroll = auto_scroll;

                this.logs_page.next({
                    items: array,
                    page: cur_page,
                    total_rows: this.rows_count,
                    filtered_rows: rows_count,

                    pages_count: this.pages_count,

                    filter: this.filter.getValue()
                })
            })


        }).subscribe();
    }

    private init():Dexie.Dexie.Promise {
        let db = new Dexie("VisionLogs");
        return db.delete().then(() => {
            this.db = new Dexie("VisionLogs");

            this.db.version(1).stores({
                logs: [
                    '++id',
                    'data.tag',
                    'ip'
                ].join(',')
            });

            this.db.open();
            this.db.table("logs").clear();

            this.table = this.db.table("logs");
        });

    }

    private applyFilter(filter:Filter) {
        let result = this.table;

        if (filter.tag) {
            result = result
                .where("data.tag")
                .anyOfIgnoreCase(filter.tag.split(','));
        }

        return result;
    }

    private logs_page:Rx.BehaviorSubject<Page> = new Rx.BehaviorSubject({
        page: 1,
        items: []
    });

    private filter: Rx.BehaviorSubject<Filter> = new Rx.BehaviorSubject({
        tag: "",
        level: LogLevel,
        ip: ""
    });

    private is_autoscroll:boolean = false;

    private table:Dexie.Dexie.Table;
    private db:Dexie.Dexie;

    private rows_count:number = 0;

    private pages_count:number = 1;

    private current_page_rx:Rx.BehaviorSubject<number> = new Rx.BehaviorSubject(1);

    private server_subscription:Rx.Subscription;
}



var STORAGE = new Storage();

export default STORAGE;