import { Component } from '@angular/core';
import {CompanyInfoComponent} from "../company-info/company-info.component";
import {SalesMailComponent} from "../sales-mail/sales-mail.component";
import {SalesDataComponent} from "../sales-data/sales-data.component";

@Component({
  selector: 'app-billing-management',
  standalone: true,
  imports: [
    CompanyInfoComponent,
    SalesMailComponent,
    SalesDataComponent
  ],
  templateUrl: './billing-management.component.html',
  styleUrl: './billing-management.component.css'
})
export class BillingManagementComponent {

}
