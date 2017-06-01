import React from 'react';
import Row from "./Row";
import TopBar from "./TopBar";
import STORAGE, {Page} from "./Storage";
import {ItemWrapper, LogLevel} from "../server/server";
import Pagination from "./Pagination";

export interface LogEntry {
    level: LogLevel;
    message:string;
    object:string;
    tag:string;
    time:Date;
}

export interface LoggerUIState extends Page {

}

export default class LoggerUI extends React.Component<void, LoggerUIState> {

    constructor(p:any,s:any) {
        super(p,s);

        this.state = {
            items: [],
            page: 1,
            pages_count: 1
        }

    }


    componentDidMount() {
        STORAGE.getRx().subscribe((logs:Page) => {
            this.setState(logs);
        });
    }

    render() {
        return <div>
            <TopBar total_pages={this.state.pages_count} total_rows={STORAGE.TotalRows} />

            <Pagination total_pages={this.state.pages_count} current_page={this.state.page} />
            {this.state.items.map((lg, index) =>
                <Row key={index} entry={lg.data} index={index} id={lg.id} ip={lg.ip} />
            )}
            <Pagination total_pages={this.state.pages_count} current_page={this.state.page} />
        </div>
    }

}