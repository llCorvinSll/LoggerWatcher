import React from "react";
import {Filter} from "./Storage";
import {SaveAll, SetFilter} from "./StorageActions";


export interface TopBarProps {
    total_rows:number;
    filtered_rows: number;
    filter:Filter;
}

interface InputState {
    is_focused:boolean;
    tag:string;
    ip:string;
}

class FilterForm extends React.Component<Filter, InputState> {
    constructor(p:any, s:any) {
        super(p, s);

        this.state = {
            is_focused: false,
            tag: "",
            ip: ""
        };
    }

    render() {
        return <div className="navbar-form navbar-left">
            <div className="form-group">
                {/*<input*/}
                    {/*type="text"*/}
                    {/*className="form-control"*/}
                    {/*placeholder="ip"*/}
                    {/*ref="ip"*/}
                    {/*value={this.state.ip}*/}
                    {/*onChange={() => this.handleChange()}*/}
                    {/*onFocus={() => this.handleFocus(true)}*/}
                    {/*onBlur={() => this.handleFocus(false)}*/}
                {/*/>*/}
                <input
                    type="text"
                    className="form-control"
                    placeholder="tag1,tag2..."
                    ref="tag"
                    value={this.state.tag}
                    onChange={() => this.handleChange()}
                    onFocus={() => this.handleFocus(true)}
                    onBlur={() => this.handleFocus(false)}
                />
            </div>
            <button type="submit" className="btn btn-default" onClick={() => this.submitFilter()}>Filter</button>

            <button type="button" className="btn btn-default navbar-btn" onClick={() => SaveAll()}>Save All</button>
        </div>
    }

    componentWillReceiveProps(next_props:Filter) {
        if (!this.state.is_focused) {
            this.setState({
                is_focused: this.state.is_focused,
                tag: next_props.tag,
                ip: next_props.ip
            })
        }
    }

    private submitFilter() {
        SetFilter({
            ip:this.state.ip,
            tag: this.state.tag
        })
    }

    private handleChange() {
        this.setState({
            is_focused: this.state.is_focused,
            tag: (this.refs['tag'] as HTMLInputElement).value,
            ip: (this.refs['ip'] as HTMLInputElement).value
        });
    }

    private handleFocus(is_focus:boolean) {
        if (this.state.is_focused !== is_focus) {

            this.setState({
                is_focused: is_focus
            })

        }
    }
}


export default class TopBar extends React.Component<TopBarProps, void> {
    render() {
        return <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">VisionLog</a>
                </div>

                <FilterForm {...this.props.filter} />

                <ul className="nav navbar-nav navbar-right">
                    <li><p className="navbar-text">Total: {this.props.total_rows}</p></li>
                    <li><p className="navbar-text">Filtered: {this.props.filtered_rows}</p></li>
                </ul>
                </div>

        </nav>
    }
}