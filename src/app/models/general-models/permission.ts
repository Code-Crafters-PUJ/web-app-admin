import { Account } from "./account";
import { Modul } from "./modul";
import { Operation } from "./operation";

export interface Permission {
    id:number;
    modul:Modul;
    Operation:Operation;
    account:Account;
}
