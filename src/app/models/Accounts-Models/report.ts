import { Account } from "./account";

export interface Report {
    id:number;
    activity:String;
    date:Date;
    account:Account[];
}
