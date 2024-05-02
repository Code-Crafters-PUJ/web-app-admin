import { Billing } from "./billing";

export interface Client {
    id: number;
    company_name: string;
    contact_name: string;
    email: string;
    telephone: string;
    NIT: string;
    status: string;
    billings: Billing[];
}

