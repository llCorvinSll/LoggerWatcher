import React from 'react';
import Row from "./Row";
import TopBar from "./TopBar";
import STORAGE from "./Storage";
import {ItemWrapper, LogLevel} from "../server/server";

export interface LogEntry {
    level: LogLevel;
    message:string;
    object:string;
    tag:string;
    time:Date;
}

export default class LoggerUI extends React.Component<void, void> {

    componentDidMount() {
        STORAGE.getRx().subscribe((logs:ItemWrapper[]) => {
            this.logs = logs;

            this.forceUpdate();

        })
    }

    render() {
        return <div>
            <TopBar />
            {this.logs.map((lg, index) =>
                <Row key={index} entry={lg.data} index={index} ip={lg.ip} />
            )}
        </div>
    }

    private logs:ItemWrapper[] = [];
}