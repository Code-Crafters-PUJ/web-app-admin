import { Component, OnInit } from '@angular/core';
import {NgFor, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import { Trials } from '../../../../models/sales-models/trial';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';

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

  constructor(
    private salesService: SalesService, 
    //private serviceService: serviceService
  ) { }

  ngOnInit(): void {
    this.salesService.getTrials().subscribe((data) => {
      this.trials = data.trials;
    });
  
  }
}
