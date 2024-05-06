import { Client } from "./client";

export interface Trials {
    clients: Client[],
    duration: number,
    type: string
}