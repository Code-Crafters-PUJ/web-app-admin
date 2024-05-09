export interface Plan {
    id: number;
    type: string;
    description: string;
    mensualPrice: number;
    semestralPrice: number;
    anualPrice: number;
    users: number;
    state: string;
    createdAt: string;
    updatedAt: string;
    createPlan: boolean;
    planDescription: string;
    createService: boolean;
    serviceDescription: string;
    numAccounts: number;
    numServices: number;
}
  