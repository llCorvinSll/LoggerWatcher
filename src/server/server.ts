import socketIo from "@node/socket.io";
import Rx from "@node/rxjs";
import http from "@node/http";

// var Rx = SystemJS._nodeRequire('rxjs');
// var http = SystemJS._nodeRequire('http');
//var socketIo = SystemJS._nodeRequire("socket.io");



export function runListner() {
    const server = http.createServer();

    const io = socketIo(server);
    const sourceConnect = Rx.Observable.create(function (observer:Rx.Observer<any>) {
        io.on('connection', function (socket:any) {
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

