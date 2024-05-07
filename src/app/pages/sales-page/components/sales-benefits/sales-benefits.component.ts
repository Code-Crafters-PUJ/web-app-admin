import { Component, OnInit } from '@angular/core';
import {NgFor, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import { Trials } from '../../../../models/sales-models/trial';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { Coupon } from '../../../../models/sales-models/coupon';

@Component({
  selector: 'app-sales-benefits',
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './sales-benefits.component.html',
  styleUrl: './sales-benefits.component.css'
})
export class SalesBenefitsComponent implements OnInit {
  public trials: Trials[] = [];
  public coupons: Coupon[] = [];

  constructor(
    private salesService: SalesService, 
    //private serviceService: serviceService
  ) { }

  ngOnInit(): void {
    this.salesService.getTrials().subscribe((data) => {
      this.trials = data.trials;
    });
    this.salesService.getCoupons().subscribe((data) => {
      this.coupons = data.coupons;
      this.coupons.forEach(element => {
        element.expirationDate = new Date(element.expirationDate).toLocaleDateString();
      });
    });
  }
}
