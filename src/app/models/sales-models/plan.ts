import { Billing} from "./billing";

export interface Plan {
    id: number;
    type: string;
    price: number;
    plan_description: string;
    duration:string
    billings: Billing[];
}
