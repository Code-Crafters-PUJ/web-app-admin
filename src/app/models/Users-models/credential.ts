import { Account } from "./account";

export interface Credential {
    id:number;
    email:string;
    hash:string;
    account:Account
}
