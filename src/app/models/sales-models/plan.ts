import { Subscription } from "./subscription";

export interface Plan {
    id: number;
    type: string;
    price: number;
    description: string;
    subscriptions: Subscription[];
}
