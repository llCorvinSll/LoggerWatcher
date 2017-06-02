import socketIo from "@node/socket.io";
import Rx from "@node/rxjs";
import http from "@node/http";

export enum LogLevel {
    ALL = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5,
    FATAL = 6,
    OFF = 7,
}

export interface ItemWrapper {
    id:number;
    ip:string;
    data: any;
}
export function runListner():Rx.Observable<ItemWrapper> {
    const server = http.createServer();

    const io = socketIo(server);
    const sourceConnect = Rx.Observable.create(function (observer:Rx.Observer<any>) {
        io.on('connection', function (socket:any) {
            socket.emit('my socketId', {'socketId': socket.id, 'connectTime': Date.now()});

            socket.on('message', function (data:any) {
                observer.next({ip:socket.request.connection.remoteAddress, 'data': data, 'event': 'client connect'});
            });
        });
    });

    server.listen(3333);

    return sourceConnect;
}

