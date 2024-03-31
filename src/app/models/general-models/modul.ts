import { Permission } from "./permission";

export interface Modul {
    id:number;
    description:string;
    permissions:Permission[];
}
