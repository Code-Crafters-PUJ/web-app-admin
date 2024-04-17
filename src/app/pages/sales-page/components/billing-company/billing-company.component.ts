import {Component,OnInit} from '@angular/core';
import {BillingService} from "../../../../services/sales-services/billing/billing.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Billing} from "../../../../models/sales-models/billing";
import { FormsModule } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-billing-company',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './billing-company.component.html',
  styleUrl: './billing-company.component.css'
})
export class BillingCompanyComponent implements OnInit {
  billings: Billing[] = [];
  Actualpage: number = 1;
  totalPages: number = 0;
  billingsFiltered: Billing[] = [];
  filtroAplicado: boolean = false;
  searchText: string = '';

  constructor(
      private billingService: BillingService,
      private route: ActivatedRoute,
      private router: Router
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actualpage = +params['pagina'] || 1;
      if (this.filtroAplicado) {
        this.billings = this.billingsFiltered;
        console.log(this.billings)
      }
      else {
        this.getSubscriptions();
      }
    });
  }
  private getSubscriptions() {
    this.billingService.getBillings().subscribe(
        data => {
          this.billings = data;
          this.totalPages = Math.ceil(this.billings.length / 14);
        },
        error => {
          console.error('Error al obtener subscripciones:', error);
        }
    );
  }
  private updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: this.Actualpage },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    if (this.Actualpage > 1) {
      this.Actualpage--;
      this.updateURL();
    }
  }

  nextPage() {
    if (this.Actualpage < this.totalPages) {
      this.Actualpage++;
      this.updateURL();
    }
  }
  getCurrentDate(): Date {
    return new Date();
  }
  onInput(value: string) {
    this.searchText = value || '';
  }
  searchByCompany() {
    if (this.searchText.trim().length != 0) {
      this.getSubscriptions();
      this.billingsFiltered = this.billings.filter(subscription => subscription.client.company_name.toLowerCase().includes(this.searchText.toLowerCase()));
      this.filtroAplicado = true;
      this.billings = this.billingsFiltered;
      this.router.navigateByUrl('/home/accounts/billing/?pagina='+1)
    }
    else {
      this.filtroAplicado = false;
      this.getSubscriptions();
    }
  }
  saveCompanyId(id: number): void {
    const companyId: string = id.toString();
    sessionStorage.setItem('companyId', companyId);
  }
}
