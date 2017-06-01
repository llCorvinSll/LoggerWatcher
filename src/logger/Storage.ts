import Rx from "rxjs";
import {ItemWrapper, LogLevel, runListner} from "../server/server";
import Dexie from "@node/dexie";


interface Filter {
    tag: string;
    level:LogLevel;
    ip:string;
}

const PAGE_SIZE = 200;


const db = new Dexie("VisionLogs");
db.version(1).stores({logs: '++id'});
db.table("logs").clear();

class Storage {

    getFilter():void {
        return this.filter;
    }

    get FirstId():number {
        return this.first_id;
    }

    get TotalPages():number {
        return this.pages_count;
    }

    get TotalRows():number {
        return this.rows_count;
    }

    get CurrentPage():number {
        return this.current_page;
    }
    
    setPage(page:number):void {
        this.current_page = page;
    }

    getRx():Rx.Observable<ItemWrapper[]> {

        this.table = db.table("logs");

        this.server_subscription = runListner().subscribe((obj:any) => {
            this.table
                .add(obj)
                .then((id:number) => {
                    this.rows_count++;

                    let auto_scroll = false;

                    if(this.current_page === this.pages_count) {
                        auto_scroll = true;
                    }

                    this.pages_count = Math.ceil(this.rows_count / PAGE_SIZE);

                    if(auto_scroll) {
                        this.current_page = this.pages_count;
                    }

                    if (this.first_id === void 0) {
                        this.first_id = id;
                    }

                    console.log('count', this.rows_count, this.pages_count);

                    this.table.offset((this.current_page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray((array:ItemWrapper[]) => {
                        this.logs.next(array)
                    })
                });
        });

        return this.logs;
    }


    private logs:Rx.BehaviorSubject<ItemWrapper[]> = new Rx.BehaviorSubject([]);

    private filter: Rx.BehaviorSubject<Filter> = new Rx.BehaviorSubject({
        tag: "",
        level: LogLevel,
        ip:""
    });

    private table:Dexie.Dexie.Table;

    private rows_count:number = 0;

    private pages_count:number = 1;

    private current_page:number = 1;

    private first_id:number;

    private server_subscription:Rx.Subscription;
}



var STORAGE = new Storage();

export default STORAGE;