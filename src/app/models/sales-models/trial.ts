import { Client } from "./client";

export interface Trials {
    id: number;
    client: Client;
    duration: number;
    planType: string;
    state: string;
}