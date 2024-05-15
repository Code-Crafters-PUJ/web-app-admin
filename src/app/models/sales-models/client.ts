import { Billing } from "./billing";
import { Plan } from "./plan";

export interface Client {
    id: number;
    companyName: string;
    contactName: string;
    email: string;
    telephone: string;
    nit: string;
    active:boolean;
    status: string;
    billings: Billing[];
    plan: Plan | null;
}

