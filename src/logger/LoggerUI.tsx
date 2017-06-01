import React from 'react';
import Row from "./Row";
import TopBar from "./TopBar";
import STORAGE from "./Storage";
import {ItemWrapper, LogLevel} from "../server/server";
import Pagination from "./Pagination";

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

        });
    }

    render() {
        return <div>
            <TopBar total_pages={STORAGE.TotalPages} total_rows={STORAGE.TotalRows} />

            <Pagination total_pages={STORAGE.TotalPages} current_page={STORAGE.CurrentPage} />
            {this.logs.map((lg, index) =>
                <Row key={index} entry={lg.data} index={index} id={lg.id} ip={lg.ip} />
            )}
            <Pagination total_pages={STORAGE.TotalPages} current_page={STORAGE.CurrentPage} />
        </div>
    }

    private logs:ItemWrapper[] = [];
}