import { Time } from "@angular/common";
import { Client } from "./client";
import { Payment } from "./payment";
import { Plan } from "./plan";

export interface Subscription {
    id: number;
    client: Client;
    startDate: Date;
    endDate: Date;
    status: boolean;
    usage: Time;
    payment: Payment;
    plan: Plan;
}
