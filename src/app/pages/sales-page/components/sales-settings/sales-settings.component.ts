import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { PlansDTO, ServiceDTO } from '../../../../DTO/sales.dto';
import { Observable } from 'rxjs/internal/Observable';

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
  public salesData: PlansDTO[] = [];
  public newPlan: PlansDTO = new PlansDTO({});
  public servicesData: ServiceDTO[] = [];

  constructor(
    private salesService: SalesService, 
    //private serviceService: serviceService
  ) { }

  ngOnInit(): void {
    this.salesService.getSalesData().subscribe((data: {plans: PlansDTO[]}) => {
      this.salesData = data.plans;
    });
    /*this.serviceService.getServices().subscribe((data: ServiceDTO[]) => {
      this.servicesData = data;
  });*/
  
  }

  createPlan(): Observable<PlansDTO> {
    return this.salesService.createPlan(this.newPlan);
  }
  
  createPlanMensual(): void {
    this.newPlan.price = this.newPlan.priceMensual;
    this.newPlan.duration = 1;
    this.createPlan().subscribe({
      next: (response: PlansDTO) => {
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
      next: (response: PlansDTO) => {
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
      next: (response: PlansDTO) => {
        console.log('Plan anual creado', response);
        this.salesData.push(response);
      },
      error: (error: any) => {
        console.error('Error creando plan anual', error);
      }
    });
  }


}
