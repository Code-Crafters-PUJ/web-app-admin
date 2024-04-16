import {Component, OnInit} from '@angular/core';
import {GeneralInformationComponent} from "../general-page/components/general-information/general-information.component";
import {ManageAccountComponent} from "../general-page/components/manage-account/manage-account.component";
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../../global/sidebar/sidebar.component";
import {TableAccountsComponent} from "../general-page/components/table-accounts/table-accounts.component";
import {ActivatedRoute, Router} from "@angular/router";
import {BillingManagementComponent} from "./components/billing-management/billing-management.component";
import {BillingCompanyComponent} from "./components/billing-company/billing-company.component";
import {GeneralSalesComponent} from "./components/general-sales/general-sales.component";
import {SalesSettingsComponent} from "./components/sales-settings/sales-settings.component";
import {SalesBenefitsComponent} from "./components/sales-benefits/sales-benefits.component";

@Component({
  selector: 'app-sales-page',
  standalone: true,
  imports: [
    GeneralInformationComponent,
    ManageAccountComponent,
    NgIf,
    SidebarComponent,
    TableAccountsComponent,
    BillingManagementComponent,
    BillingCompanyComponent,
    GeneralSalesComponent,
    SalesSettingsComponent,
    SalesBenefitsComponent
  ],
  templateUrl: './sales-page.component.html',
  styleUrl: './sales-page.component.css'
})
export class SalesPageComponent implements OnInit {

  url: string = 'general';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const segment = segments[3];
    const lastSegment = segments[4];

    switch (segment) {
      case 'general':
        this.url = 'general';
        break;
      case 'settings':
        this.url = 'settings';
        break;
      case 'benefits':
        this.url = 'benefits';
        break;
      case 'billing':
        if (lastSegment === 'company') {
          this.url = 'company';
        } else {
          this.url = 'billing';
        }
        break;
      default:
        this.url = 'general';
    }
  }
}
