import React from 'react';
import {runListner} from "../server/server";
import Row from "./Row";


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
export interface LogEntry {
    level: LogLevel;
    message:string;
    object:string;
    tag:string;
    time:Date;
}

export default class LoggerUI extends React.Component<void, void> {

    componentDidMount() {
        runListner().subscribe((obj:any) => {
            this.logs.push(obj);

            this.forceUpdate();
        })
    }

    render() {
        return <div>
            {this.logs.map((lg) =>
                <Row entry={lg.data} ip={lg.socket.client.conn.remoteAddress} />
            )}
        </div>
    }

    private logs:any[] = [];
}