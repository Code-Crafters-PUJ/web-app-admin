import { Permission } from "./permission";

export interface Module {
    id:number;
    description:string;
    permissions:Permission[];
}
