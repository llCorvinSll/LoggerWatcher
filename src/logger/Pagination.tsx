import React from "react";
import {SetPage} from "./StorageActions";


export interface PaginationProps {
    total_pages: number;

    current_page: number;
}

export default class Pagination extends React.Component<PaginationProps, void> {


    render() {
        return <nav aria-label="Page navigation" className="LoggerPagination">
            <ul className="pagination pagination-sm LoggerPagination__Pagination">
                {
                    Array.apply(null, {length: this.props.total_pages}).map((_:any, i:number) => i+1).map((page:number) => {
                        return <li className={ page === this.props.current_page? "active" : ""} key={page} ><a href="#" onClick={() => SetPage(page)}>{page}</a></li>
                    })
                }
            </ul>
        </nav>
    }

}