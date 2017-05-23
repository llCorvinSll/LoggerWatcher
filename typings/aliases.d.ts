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

// declare module "@node/react" {
//     import * as React from 'react';
//     export = React;
// }

// declare module "@node/react-dom" {
//     import * as ReactDOM from 'react-dom';
//     export = ReactDOM;
// }