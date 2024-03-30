import { Component, OnInit } from '@angular/core';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { SalesDataComponent } from '../sales-data/sales-data.component';
import { SalesMailComponent } from '../sales-mail/sales-mail.component';



@Component({
  selector: 'app-billing-management',
  standalone: true,
  imports: [CompanyInfoComponent, SalesDataComponent, SalesMailComponent],
  templateUrl: './billing-management.component.html',
  styleUrl: './billing-management.component.css'
})
export class BillingManagementComponent implements OnInit{

  constructor() { }

  ngOnInit() {
  }

}
