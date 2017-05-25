import Rx from "@node/rxjs";
import {ItemWrapper, LogLevel, runListner} from "../server/server";


interface Filter {
    tag: string;
    level:LogLevel;
    ip:string;
}

class Storage {

    getFilter():void {
        return this.filter;
    }

    getRx():Rx.Observable<ItemWrapper[]> {
        this.server_subscribtion = runListner().subscribe((obj:any) => {
            this.logs.getValue().push(obj);
            this.logs.next(this.logs.getValue());
        });

        return this.logs;
    }


    private logs:Rx.BehaviorSubject<ItemWrapper[]> = new Rx.BehaviorSubject([]);

    private filter: Rx.BehaviorSubject<Filter> = new Rx.BehaviorSubject({
        tag: "",
        level: LogLevel,
        ip:""
    })

    private server_subscribtion:Rx.Subscription;

}



var STORAGE = new Storage();

export default STORAGE;