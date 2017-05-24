import React from 'react';
import {LogEntry, LogLevel} from "./LoggerUI";
import moment from 'moment';


interface RowProps {
    entry: LogEntry;

    ip: string;
}


export default class Row extends React.Component<RowProps, void> {

    render() {
        let entry = this.props.entry;

        return <div className="">
            <h6>{moment(entry.time).format()}
                {this.renderLevelLable()}
                {<span className="label label-default">{this.props.ip}</span>}
                <span className="label label-default">{entry.tag}</span> {entry.message}</h6>
        </div>
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