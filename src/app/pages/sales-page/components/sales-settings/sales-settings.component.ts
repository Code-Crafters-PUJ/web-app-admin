import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { PlanDTO } from '../../../../DTO/sales.dto';
import { Observable } from 'rxjs/internal/Observable';
import { Service } from '../../../../models/sales-models/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales-settings',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './sales-settings.component.html',
  styleUrl: './sales-settings.component.css'
})
export class SalesSettingsComponent implements OnInit {
  public salesData: PlanDTO[] = [];
  public newPlan: PlanDTO = new PlanDTO({});
  public servicesData: Service[] = [];

  serviceForm = this.formBuilder.group({
    name: ['', Validators.required],
    state: [true, Validators.required],
  });

  constructor(
    private salesService: SalesService,
    //private serviceService: serviceService
    private formBuilder: FormBuilder,
  ) { }

  getServices() {
    this.salesService.getServices().subscribe((data) => {
      this.servicesData = data.services;
      this.servicesData.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toLocaleDateString()
      })
    });
  }

  ngOnInit(): void {
    this.salesService.getSalesData().subscribe((data: { plans: PlanDTO[] }) => {
      this.salesData = data.plans;
    });
    this.getServices()

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

  submitService(id: string) {
    if (this.serviceForm.invalid) {
      Swal.fire({
        title: "Servicio",
        text: "Llene por favor todos los campos",
        icon: "error"
      });
      return
    }
    console.log(id);

    if (id == "crear") {
      this.createService()
    } else {
      this.removeService()
    }
  }

  createService() {
    const name = this.serviceForm.value.name!
    if (this.servicesData.find((service) => service.name === name)) {
      this.salesService.updateService(name, this.serviceForm.value.state!).subscribe((data) => {
        console.log(data);
        this.getServices()
      })
    } else {
      this.salesService.createService({
        name,
        state: this.serviceForm.value.state!
      }).subscribe((data) => {
        console.log(data);
        this.getServices()
      })
    }
  }

  removeService() {
    const name = this.serviceForm.value.name!
    if (!this.servicesData.find((service) => service.name === name)) {
      Swal.fire({
        title: "Servicio",
        text: "No existe un servicio con ese nombre",
        icon: "error"
      })
      return
    }
    this.salesService.deleteService(name).subscribe((data) => {
      console.log(data);
      this.getServices()
    })

  }
}
