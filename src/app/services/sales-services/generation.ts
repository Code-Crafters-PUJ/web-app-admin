import { Client } from "../../models/sales-models/client";
import { Payment } from "../../models/sales-models/payment";
import { Plan } from "../../models/sales-models/plan";
import { Subscription } from "../../models/sales-models/subscription";

export class Generation {
    static client1: Client;
    static client2: Client;
    static client3: Client;

    static payment1: Payment;
    static payment2: Payment;
    static payment3: Payment;
    static payment4: Payment;

    static plan1: Plan;
    static plan2: Plan;
    static plan3: Plan;

    static subscription1: Subscription;
    static subscription2: Subscription;
    static subscription3: Subscription;
    static subscription4: Subscription;
    static subscription5: Subscription;
    static subscription6: Subscription;
    static subscription7: Subscription;
    static subscription8: Subscription;
    static subscription9: Subscription;
    static subscription10: Subscription;
    static subscription11: Subscription;
    static subscription12: Subscription;
    static subscription13: Subscription;
    static subscription14: Subscription;
    static subscription15: Subscription;
    static subscription16: Subscription;
    static subscription17: Subscription;
    static subscription18: Subscription;

    static generateData(): void {
        this.client1 = {
            id: 1,
            companyName: "Company A",
            contactName: "John Doe",
            email: "john@example.com",
            phone: "123456789",
            NIT: "123-456-789",
            subscriptions: []
        };
        
        this.client2 = {
            id: 2,
            companyName: "Company B",
            contactName: "Jane Smith",
            email: "jane@example.com",
            phone: "987654321",
            NIT: "987-654-321",
            subscriptions: []
        };
        
        this.client3 = {
            id: 3,
            companyName: "Company C",
            contactName: "Alice Johnson",
            email: "alice@example.com",
            phone: "555123456",
            NIT: "555-123-456",
            subscriptions: []
        };
        
        this.payment1 = {
            id: 1,
            date: new Date(),
            paymentMethod: "Tarjeta de Crédito",
        };

        this.payment2 = {
            id: 2,
            date: new Date(),
            paymentMethod: "PayPal",
        };

        this.payment3 = {
            id: 3,
            date: new Date(),
            paymentMethod: "Tarjeta Debito",
        };
        this.payment4 = {
            id: 4,
            date: new Date(),
            paymentMethod: "ninguno",
        };
        this.plan1 = {
            id: 1,
            type: "Golden",
            price: 50,
            description: "Golden subscription plan",
            subscriptions: []
        };

        this.plan2 = {
            id: 2,
            type: "Silver",
            price: 100,
            description: "Silver subscription plan",
            subscriptions: []
        };
        this.plan3 = {
            id: 3,
            type: "Free",
            price: 0,
            description: "Free subscription plan",
            subscriptions: []
        };
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);
        this.subscription1 = {
            id: 1,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment1,
            plan: this.plan1
        };
        this.subscription2 = {
            id: 2,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment2,
            plan: this.plan1
        };
        this.subscription3 = {
            id: 3,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment3,
            plan: this.plan1
        };
        this.subscription4 = {
            id: 4,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment1,
            plan: this.plan2
        };
        this.subscription5 = {
            id: 5,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment2,
            plan: this.plan2
        };
        this.subscription6 = {
            id: 6,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment3,
            plan: this.plan2
        };
        this.subscription7 = {
            id: 7,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment4,
            plan: this.plan3
        };
        this.subscription8 = {
            id: 8,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment4,
            plan: this.plan3
        };
        this.subscription9 = {
            id: 9,
            client: this.client1,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage:{ hours: 10, minutes: 30 },
            payment: this.payment4,
            plan: this.plan3
        };
        this.subscription10 = {
            id: 10,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate,
            status: true,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment1,
            plan: this.plan1
        };
        const endDate2=new Date()
        endDate2.setFullYear(endDate.getFullYear() - 2);
        this.subscription11 = {
            id: 11,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment2,
            plan: this.plan1
        };
        this.subscription12 = {
            id: 12,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate2,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment3,
            plan: this.plan1
        };
        this.subscription13 = {
            id: 13,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment1,
            plan: this.plan2
        };
        this.subscription14 = {
            id: 14,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate2,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment2,
            plan: this.plan2
        };
        this.subscription15 = {
            id: 15,
            client: this.client2,
            startDate: new Date(),
            endDate: endDate,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment3,
            plan: this.plan2
        };
        this.subscription16 = {
            id: 16,
            client: this.client3,
            startDate: new Date(),
            endDate: endDate2,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment1,
            plan: this.plan1
        };
        this.subscription17 = {
            id: 17,
            client: this.client3,
            startDate: new Date(),
            endDate: endDate,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment2,
            plan: this.plan1
        };
        this.subscription18 = {
            id: 18,
            client: this.client3,
            startDate: new Date(),
            endDate: endDate2,
            status: false,
            usage: { hours: 10, minutes: 30 },
            payment: this.payment3,
            plan: this.plan1
        };
        this.client1.subscriptions.push(this.subscription1, this.subscription2, this.subscription3, this.subscription4, this.subscription5, this.subscription6, this.subscription7, this.subscription8, this.subscription9);
        this.client2.subscriptions.push(this.subscription10, this.subscription11, this.subscription12, this.subscription13, this.subscription14, this.subscription15);
        this.client3.subscriptions.push(this.subscription16, this.subscription17, this.subscription18);
        this.plan1.subscriptions.push(this.subscription1, this.subscription2, this.subscription3, this.subscription10, this.subscription11, this.subscription12, this.subscription16, this.subscription17, this.subscription18);
        this.plan2.subscriptions.push(this.subscription4, this.subscription5, this.subscription6, this.subscription13, this.subscription14, this.subscription15);
        this.plan3.subscriptions.push(this.subscription7, this.subscription8, this.subscription9);
    }
}
Generation.generateData();
export default Generation;