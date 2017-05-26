System.register(["socket.io", "@reactivex/rxjs", "http"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function runListner() {
        var server = http.createServer();
        var io = socketIo(server);
        var sourceConnect = rxjs_1.default.Observable.create(function (observer) {
            io.on('connection', function (socket) {
                socket.emit('my socketId', { 'socketId': socket.id, 'connectTime': Date.now() });
                socket.on('message', function (data) {
                    observer.next({ ip: socket.client.conn.remoteAddress, 'data': data, 'event': 'client connect' });
                });
            });
        });
        server.listen(3333);
        return sourceConnect;
    }
    exports_1("runListner", runListner);
    var socketIo, rxjs_1, http, LogLevel;
    return {
        setters: [
            function (socketIo_1) {
                socketIo = socketIo_1;
            },
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            },
            function (http_1) {
                http = http_1;
            }
        ],
        execute: function () {
            (function (LogLevel) {
                LogLevel[LogLevel["ALL"] = 0] = "ALL";
                LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
                LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
                LogLevel[LogLevel["INFO"] = 3] = "INFO";
                LogLevel[LogLevel["WARN"] = 4] = "WARN";
                LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
                LogLevel[LogLevel["FATAL"] = 6] = "FATAL";
                LogLevel[LogLevel["OFF"] = 7] = "OFF";
            })(LogLevel || (LogLevel = {}));
            exports_1("LogLevel", LogLevel);
        }
    };
});
