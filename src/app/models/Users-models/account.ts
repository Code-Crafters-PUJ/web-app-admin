import { Permission } from "./permission";
import { Rol } from "./rol";
import { Report } from "./report";
import { Credential } from "./credential";

export interface Account {
    id:number;
    name:string;
    last_name:string;
    id_card:string;
    last_connection:Date;
    connected:number
    rol:Rol;
    permissions:Permission[];
    Reports:Report[];
}
