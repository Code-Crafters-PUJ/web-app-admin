import { Billing } from "./billing";

export interface Client {
    id: number;
    companyName: string;
    contactName: string;
    email: string;
    telephone: string;
    nit: string;
    status: string;
    billings: Billing[];
}

