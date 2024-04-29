import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sales-benefits',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './sales-benefits.component.html',
  styleUrl: './sales-benefits.component.css'
})
export class SalesBenefitsComponent {

}
