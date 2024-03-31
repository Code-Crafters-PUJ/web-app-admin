import { Subscription } from "./subscription";

export interface Client {
    id: number;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    NIT: string;
    subscriptions: Subscription[];
}

