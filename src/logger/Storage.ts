import Rx from "rxjs";
import {ItemWrapper, LogLevel, runListner} from "../server/server";
import Dexie from "@node/dexie";


interface Filter {
    tag: string;
    level:LogLevel;
    ip:string;
}


const db = new Dexie("VisionLogs");
db.version(1).stores({logs: '++id'});
db.table("logs").clear();

class Storage {

    getFilter():void {
        return this.filter;
    }

    getRx():Rx.Observable<ItemWrapper[]> {
        this.server_subscription = runListner().subscribe((obj:any) => {
            let table = db.table("logs");

            table
                .add(obj)
                .then((id:number) => {
                    table.where('id').aboveOrEqual(id - 200).toArray((array:ItemWrapper[]) => {
                        this.logs.next(array)
                    })
                });


            //this.logs.getValue().push(obj);
            //this.logs.next(this.logs.getValue());
        });

        return this.logs;
    }


    private logs:Rx.BehaviorSubject<ItemWrapper[]> = new Rx.BehaviorSubject([]);

    private filter: Rx.BehaviorSubject<Filter> = new Rx.BehaviorSubject({
        tag: "",
        level: LogLevel,
        ip:""
    });

    private server_subscription:Rx.Subscription;
}



var STORAGE = new Storage();

export default STORAGE;