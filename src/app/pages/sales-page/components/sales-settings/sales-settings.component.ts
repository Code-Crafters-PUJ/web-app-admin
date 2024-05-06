import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { PlanDTO } from '../../../../DTO/sales.dto';
import { Observable } from 'rxjs/internal/Observable';
import { Service } from '../../../../models/sales-models/service';

@Component({
  selector: 'app-sales-settings',
  standalone: true,
    imports: [  
      NgFor,
      FormsModule,  
      NgOptimizedImage,
    ],
  templateUrl: './sales-settings.component.html',
  styleUrl: './sales-settings.component.css'
})
export class SalesSettingsComponent implements OnInit {
  public salesData: PlanDTO[] = [];
  public newPlan: PlanDTO = new PlanDTO({});
  public servicesData: Service[] = [];

  constructor(
    private salesService: SalesService, 
    //private serviceService: serviceService
  ) { }

  ngOnInit(): void {
    this.salesService.getSalesData().subscribe((data: {plans: PlanDTO[]}) => {
      this.salesData = data.plans;
    });
    this.salesService.getServices().subscribe((data) => {
      this.servicesData = data.services;
    });
  
  }

  createPlan(): Observable<PlanDTO> {
    return this.salesService.createPlan(this.newPlan);
  }
  
  createPlanMensual(): void {
    this.newPlan.price = this.newPlan.priceMensual;
    this.newPlan.duration = 1;
    this.createPlan().subscribe({
      next: (response: PlanDTO) => {
        console.log('Plan mensual creado', response);
        this.salesData.push(response);
      },
      error: (error: any) => {
        console.error('Error creando plan mensual', error);
      }
    });
  }

  createPlanSemestral(): void {
    this.newPlan.price = this.newPlan.priceSemestral;
    this.newPlan.duration = 6;
    this.createPlan().subscribe({
      next: (response: PlanDTO) => {
        console.log('Plan semestral creado', response);
        this.salesData.push(response);
      },
      error: (error: any) => {
        console.error('Error creando plan semestral', error);
      }
    });
  }

  createPlanAnual(): void {
    this.newPlan.price = this.newPlan.priceAnual;
    this.newPlan.duration = 12;
    this.createPlan().subscribe({
      next: (response: PlanDTO) => {
        console.log('Plan anual creado', response);
        this.salesData.push(response);
      },
      error: (error: any) => {
        console.error('Error creando plan anual', error);
      }
    });
  }
}
