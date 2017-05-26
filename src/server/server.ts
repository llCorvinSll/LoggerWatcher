import * as socketIo from 'socket.io';
import Rx from '@reactivex/rxjs';
import * as http from 'http';

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
                observer.next({ip:socket.client.conn.remoteAddress, 'data': data, 'event': 'client connect'});
            });
        });
    });

    server.listen(3333);

    return sourceConnect;
}

