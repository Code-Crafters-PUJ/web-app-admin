import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { BillingService } from '../../../../services/sales-services/billing/billing.service';
import { Billing } from '../../../../models/sales-models/billing';
import { Client } from '../../../../models/sales-models/client';
import { SalesAux } from './SalesAux'

@Component({
  selector: 'app-general-sales',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    RouterLink,
    CommonModule
  ],
  templateUrl: './general-sales.component.html',
  styleUrl: './general-sales.component.css'
})
export class GeneralSalesComponent {
  billings: Billing[] = []
  billingsFiltered: Billing[] = []
  billingsData: Billing[] = []
  clients: Client[] = []
  clientesAux: SalesAux[] = []
  filtroAplicado: boolean = false;
  searchText: string = '';
  totalpagesClients: number = 0
  totalpagesSubscription: number = 0
  actualpageClients: number = 1
  actualpageSubscription: number = 1
  totalToday: number = 0
  totalMonth: number = 0
  totalYear: number = 0
  totalFree: number = 0
  totalGolden: number = 0
  totalSilver: number = 0

  constructor(private billingService: BillingService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.actualpageSubscription = +params['pagina'] || 1;
      this.actualpageClients = +params['paginaClientes'] || 1;
    });

    if (this.filtroAplicado) {
      this.getBillings();
      this.billingsData = this.billings;
      this.billings = this.billingsFiltered;
    } else {
      this.getBillings();
      this.billingsData = this.billings;
    }
    this.calculateTotals();
    this.getClients();

    for (let i = 0; i < this.clients.length; i++) {
      const nombre:String=this.clients[i].company_name
      let total:number=0
      for (let j = 0; j < this.clients[i].Billings.length; j++) {
        total+=this.clients[i].Billings[j].plan.price
      }
      const clienteAux: SalesAux = {
        nombre: nombre,
        total: total
      };
      this.clientesAux.push(clienteAux)
    }
  }

  calculateTotals(): void {
    for (let i = 0; i < this.billings.length; i++) {
      if (this.billings[i].plan.type == "Golden") {
        this.totalGolden++;
      }
      if (this.billings[i].plan.type == "Silver") {
        this.totalSilver++;
      }
      if (this.billings[i].plan.type == "Free") {
        this.totalFree++;
      }
      if (this.isSameDateAsToday(this.billings[i].initial_date)) {
        this.totalToday++;
      }
      if (this.isSameMonthAndYearAsToday(this.billings[i].final_date)) {
        this.totalMonth++;
      }
      if (this.isSameYearAsToday(this.billings[i].initial_date)) {
        this.totalYear++;
      }
    }
  }
  isSameDateAsToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }
  isSameMonthAndYearAsToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  }
  isSameYearAsToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
  }

 private getBillings() {
    this.billingService.getBillings().subscribe(
      data => {
        this.billings = data;
        this.totalpagesSubscription = Math.ceil(this.billings.length / 5);
      },
      error => {
        console.error('Error al obtener subscripciones:', error);
      }
    );
  }
  private getClients() {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
        this.totalpagesClients = Math.ceil(this.billings.length / 5);
      },
      error => {
        console.error('Error al obtener subscripciones:', error);
      }
    );
  }
  previousPage() {
    if (this.actualpageSubscription > 1) {
      this.actualpageSubscription--;
      this.updateURL();
    }
  }

  nextPage() {
    if (this.actualpageSubscription < this.totalpagesSubscription) {
      this.actualpageSubscription++;
      this.updateURL();
    }
  }
  previousClientPage() {
    if (this.actualpageClients > 1) {
      this.actualpageClients--;
      this.updateClientURL();
    }
  }

  nextClientPage() {
    if (this.actualpageClients < this.totalpagesClients) {
      this.actualpageClients++;
      this.updateClientURL();
    }
  }
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.actualpageSubscription },
      queryParamsHandling: 'merge',
    });
  }
  updateClientURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { paginaClientes: this.actualpageClients },
      queryParamsHandling: 'merge',
    });
  }
  searchByCompany() {
    if (this.searchText.trim().length != 0) {
      this.getBillings();
      this.billingsFiltered = this.billings.filter(subscription => subscription.client.company_name.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.billings = this.billingsFiltered;
      this.router.navigateByUrl('/home/accounts/billing/?pagina=' + 1)
    }
    else {
      this.filtroAplicado = false;
      this.getBillings();
    }
  }
}