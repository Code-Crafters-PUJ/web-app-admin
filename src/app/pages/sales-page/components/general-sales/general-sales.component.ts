import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { SubscriptionService } from '../../../../services/sales-services/subscription/subscription.service';
import { Subscription } from '../../../../models/sales-models/subscription';
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
  subscriptions: Subscription[] = []
  subscriptionsFiltered: Subscription[] = []
  subscriptionsData: Subscription[] = []
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

  constructor(private subscriptionService: SubscriptionService,
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
      this.getSubscriptions();
      this.subscriptionsData = this.subscriptions;
      this.subscriptions = this.subscriptionsFiltered;
    } else {
      this.getSubscriptions();
      this.subscriptionsData = this.subscriptions;
    }
    this.calculateTotals();
    this.getClients();

    for (let i = 0; i < this.clients.length; i++) {
      const nombre:String=this.clients[i].companyName
      let total:number=0
      for (let j = 0; j < this.clients[i].subscriptions.length; j++) {
        total+=this.clients[i].subscriptions[j].plan.price
      }
      const clienteAux: SalesAux = {
        nombre: nombre,
        total: total
      };
      this.clientesAux.push(clienteAux)
    }
  }

  calculateTotals(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (this.subscriptions[i].plan.type == "Golden") {
        this.totalGolden++;
      }
      if (this.subscriptions[i].plan.type == "Silver") {
        this.totalSilver++;
      }
      if (this.subscriptions[i].plan.type == "Free") {
        this.totalFree++;
      }
      if (this.isSameDateAsToday(this.subscriptions[i].startDate)) {
        this.totalToday++;
      }
      if (this.isSameMonthAndYearAsToday(this.subscriptions[i].startDate)) {
        this.totalMonth++;
      }
      if (this.isSameYearAsToday(this.subscriptions[i].startDate)) {
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

  private getSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(
      data => {
        this.subscriptions = data;
        this.totalpagesSubscription = Math.ceil(this.subscriptions.length / 5);
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
        this.totalpagesClients = Math.ceil(this.subscriptions.length / 5);
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
      this.getSubscriptions();
      this.subscriptionsFiltered = this.subscriptions.filter(subscription => subscription.client.companyName.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.subscriptions = this.subscriptionsFiltered;
      this.router.navigateByUrl('/home/sales/billing/?pagina=' + 1)
    }
    else {
      this.filtroAplicado = false;
      this.getSubscriptions();
    }
  }
}