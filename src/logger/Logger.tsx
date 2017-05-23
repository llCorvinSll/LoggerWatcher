import * as React from "@node/react"
import {runListner} from "../server/server";


export default class Logger extends React.Component<void, void> {

    componentDidMount() {
        runListner().subscribe((obj:any) => {
            this.logs.push(obj);

            this.forceUpdate();
        })
    }

    render() {
        return <div>
            {this.logs.map((lg) => {
                <div> <pre>lg.data</pre> </div>
            })}
        </div>
    }

    private logs:any[] = [];
}