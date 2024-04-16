import { Account } from "./account";

export interface Report {
    id:number;
    activity:String;
    account:Account[];
}
