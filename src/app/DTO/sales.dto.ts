export class PlanDTO {
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

  constructor(data: any) {
    this.id = data.id;
    this.type = data.type;
    this.description = data.description;
    this.price = data.price;
    this.priceMensual = data.priceMensual;
    this.priceSemestral = data.priceSemestral;
    this.priceAnual = data.priceAnual;
    this.duration = data.duration;
    this.users = data.users;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.createPlan = data.createPlan; 
    this.planDescription = data.planDescription;
    this.createService = data.createService;
    this.serviceDescription = data.serviceDescription;
  }
}
