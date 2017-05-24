import React from "react";




export default class TopBar extends React.Component<void, void> {


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


                    <form className="navbar-form navbar-left">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search"></input>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>

        </nav>
    }
}