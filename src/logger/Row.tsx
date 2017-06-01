import React from 'react';
import {LogEntry} from "./LoggerUI";
import moment from 'moment';
import {LogLevel} from "../server/server";


interface RowProps {
    entry: LogEntry;
    index:number;
    ip: string;
    id:number;
}


export default class Row extends React.Component<RowProps, void> {

    render() {
        let entry = this.props.entry;

        return <div ref={"main"} className={`LoggerRow  ${ this.props.id  % 2 === 0 ? "LoggerRow--even" : ""}`}>
            <h6 className="LoggerRow__Head">{moment(entry.time).format("HH:MM:ss:SSS")} {" "}
                {this.renderLevelLable()} {" "}
                {<span className="label label-default">{this.props.ip}</span>} {" "}
                <span className="label label-default">{entry.tag}</span> {entry.message}</h6>
            {this.renderObject()}
        </div>
    }

    private renderObject() {
        let entry = this.props.entry;

        if(!entry.object) {
            return "";
        }

        return <pre className="LoggerRow__Code">
            {entry.object}
        </pre>
    }

    private renderLevelLable() {
        let entry = this.props.entry;

        let class_lvl = "primary";

        switch (entry.level) {
            case LogLevel.INFO : {
                class_lvl = "success";
                break;
            }

            case LogLevel.TRACE: {
                class_lvl = 'info';
                break;
            }

            case LogLevel.WARN: {
                class_lvl = 'warning';
                break;
            }

            case LogLevel.FATAL:
            case LogLevel.ERROR : {
                class_lvl = 'danger';
                break;
            }

        }


        return <span className={`label label-${class_lvl}`}>{LogLevel[entry.level]}</span>;

    }

}