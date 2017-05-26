System.register(["@node/rxjs", "../server/server"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rxjs_1, server_1, Storage, STORAGE;
    return {
        setters: [
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            }
        ],
        execute: function () {
            Storage = (function () {
                function Storage() {
                    this.logs = new rxjs_1.default.BehaviorSubject([]);
                    this.filter = new rxjs_1.default.BehaviorSubject({
                        tag: "",
                        level: server_1.LogLevel,
                        ip: ""
                    });
                }
                Storage.prototype.getFilter = function () {
                    return this.filter;
                };
                Storage.prototype.getRx = function () {
                    var _this = this;
                    this.server_subscribtion = server_1.runListner().subscribe(function (obj) {
                        _this.logs.getValue().push(obj);
                        _this.logs.next(_this.logs.getValue());
                    });
                    return this.logs;
                };
                return Storage;
            }());
            STORAGE = new Storage();
            exports_1("default", STORAGE);
        }
    };
});
