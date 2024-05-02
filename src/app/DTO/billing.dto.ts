/*{
    "amount": 100,
    "client": {
        "companyName": "Tech Inc.",
        "contactName": "John Doe",
        "createdAt": "2024-05-01T16:05:04.208Z",
        "email": "john.doe@techinc.com",
        "id": 1,
        "nit": 123456789,
        "status": true,
        "telephone": "1234567890",
        "updatedAt": "2024-05-01T16:05:04.208Z"
    },
    "clientId": 1,
    "createdAt": "2024-05-01T16:05:04.380Z",
    "finalDate": "2024-04-28T00:00:00.000Z",
    "id": 1,
    "initialDate": "2024-03-29T00:00:00.000Z",
    "payment": {
        "createdAt": "2024-05-01T16:05:04.356Z",
        "id": 1,
        "method": "Credit Card",
        "updatedAt": "2024-05-01T16:05:04.356Z"
    },
    "paymentDate": "2024-03-29T00:00:00.000Z",
    "paymentId": 1,
    "plan": {
        "createdAt": "2024-05-01T16:05:04.243Z",
        "description": "Limited features, ideal for small businesses",
        "duration": 12,
        "id": 1,
        "price": 100,
        "status": true,
        "type": "Silver",
        "updatedAt": "2024-05-01T16:05:04.243Z",
        "users": 100
    },
    "planId": 1,
    "status": true,
    "updatedAt": "2024-05-01T16:05:04.380Z"
}*/

import { PlanDTO } from "./sales.dto";

export class BillingDTO {
    constructor(
        public amount: number,
        public plan: PlanDTO,
        public initialDate: Date,
        public paymentDate: Date,
    ) {}
}
