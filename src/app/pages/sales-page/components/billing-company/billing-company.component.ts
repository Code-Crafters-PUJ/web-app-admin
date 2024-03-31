import {Component,OnInit} from '@angular/core';
import {SubscriptionService} from "../../../../services/sales-services/subscription/subscription.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "../../../../models/sales-models/subscription";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing-company.component.html',
  styleUrl: './billing-company.component.css'
})
export class BillingCompanyComponent implements OnInit {
  subscriptions: Subscription[] = [];
  Actualpage: number = 1;
  totalPages: number = 0;
  subscriptionsFiltered: Subscription[] = [];
  filtroAplicado: boolean = false;
  searchText: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      if (this.filtroAplicado) {
        this.subscriptions = this.subscriptionsFiltered;
      }
      else {
        this.obtenerClientes();
      }
    });
  }
  private obtenerClientes() {
    this.subscriptionService.getSubscriptions().subscribe(
      data => {
        this.subscriptions = data;
        this.totalPages = Math.ceil(this.subscriptions.length / 14);
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  private actualizarURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }

  irPaginaAnterior() {
    if (this.Actualpage > 1) {
      this.Actualpage--;
      this.actualizarURL();
    }
  }

  irPaginaSiguiente() {
    if (this.Actualpage < this.totalPages) {
      this.Actualpage++;
      this.actualizarURL();
    }
  }
  getCurrentDate(): Date {
    return new Date();
  }
  onInput(value: string) {
    this.searchText = value || '';
  }
  buscarPorEmpresa() {
    if (this.searchText.trim().length != 0) {
      this.obtenerClientes();
      this.subscriptionsFiltered = this.subscriptions.filter(subscription => subscription.client.companyName.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.subscriptions = this.subscriptionsFiltered;
      this.router.navigateByUrl('/').then(() => {
        this.router.navigateByUrl('/?pagina=' + 1);
      });
    }
    else {
      this.filtroAplicado = false;
      this.obtenerClientes();
    }
  }
}
