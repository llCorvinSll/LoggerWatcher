declare module "@node/http" {
    import * as http from 'http';
    export = http;
}

declare module "@node/rxjs" {
    import Rx from 'rxjs/Rx';
    export = Rx;
}

declare module "@node/socket.io" {
    import * as socketIo from 'socket.io';
    export = socketIo;
}
