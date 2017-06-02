import STORAGE, {Filter} from "./Storage";


export function SetPage(page:number):void {
    console.log("set page", page);

    STORAGE.setPage(page);
}

export function SetFilter(filter:Filter):void {
    STORAGE.setFilter(filter);
}

export function SaveAll():void {
    STORAGE.saveAll();
}