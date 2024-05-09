export interface Plan {
    id: number;
    type: string;
    description: string;
    price: number;
    priceMensual: number;
    priceSemestral: number;
    priceAnual: number;
    duration: number;
    users: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    createPlan: boolean;
    planDescription: string;
    createService: boolean;
    serviceDescription: string;
    numAccounts: number;
    numservices: number;
}
  