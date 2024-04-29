import { Time } from "@angular/common";
import { Client } from "./client";
import { Payment } from "./payment";
import { Plan } from "./plan";

export interface Billing {
    id: number;
    initial_date: Date;
    final_date: Date;
    suscription_status:number
    usage: Time;
    plan: Plan;
    payment: Payment;
    client: Client;
    amount:number
}
