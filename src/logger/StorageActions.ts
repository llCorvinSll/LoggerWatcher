import STORAGE from "./Storage";


export function SetPage(page:number):void {
    console.log("set page", page);

    STORAGE.setPage(page);
}