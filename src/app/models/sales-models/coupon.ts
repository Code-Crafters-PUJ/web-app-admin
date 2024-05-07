import { Client } from "./client"

export interface Coupon {
    code: string;
    client: Client;
    discount: number;
    duration: number;
    expirationDate: Date | string;
}