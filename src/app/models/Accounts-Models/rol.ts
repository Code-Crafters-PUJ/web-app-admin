import { Account } from "./account";

export interface Rol {
    id:number;
    description:string;
    accounts:Account[]
}
