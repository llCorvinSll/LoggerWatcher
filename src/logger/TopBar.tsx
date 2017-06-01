import React from "react";


export interface TopBarProps {
    total_pages:number;
    total_rows:number;
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


                    <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search"></input>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </div>


                <ul className="nav navbar-nav navbar-right">
                    <li><p className="navbar-text">Rows: {this.props.total_rows}</p></li>
                    <li><p className="navbar-text">Pages: {this.props.total_pages}</p></li>
                </ul>
                </div>

        </nav>
    }
}