import * as socketIo from "socket.io";
import * as Rx from "rxjs";
import * as http from "http";


export function runListner() {
    const server = http.createServer();

    const io = socketIo(server);
    const sourceConnect = Rx.Observable.create(function (observer:Rx.Observer<any>) {
        io.on('connection', function (socket) {
            socket.emit('my socketId', {'socketId': socket.id, 'connectTime': Date.now()});

            socket.on('message', function (data:any) {
                observer.next({'socket': socket, 'data': data, 'event': 'client connect'});
            });
        });
    });


    sourceConnect
        .subscribe(function (obj:any) {
            let data = obj.data;
            console.log(data);
            //io.emit('all users', usersMap.toArray());
        });


    server.listen(3333);
}

