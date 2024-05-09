import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { PlanDTO } from '../../../../DTO/sales.dto';
import { Observable } from 'rxjs/internal/Observable';
import { Service } from '../../../../models/sales-models/service';
import Swal from 'sweetalert2';
import { Plan } from '../../../../models/sales-models/plan';

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
  public plansData: Plan[] = [];
  public servicesData: Service[] = [];

  planForm = this.formBuilder.group<any>({
    name: ['', Validators.required],
    mensualPrice: [0, Validators.required],
    semestralPrice: [0, Validators.required],
    anualPrice: [0, Validators.required],
    hasAccountLimit: [false, Validators.required],
    accountLimit: [null, Validators.required],
    hasServiceLimit: [false, Validators.required],
    serviceLimit: [null, Validators.required],
    state: [true, Validators.required],
  });
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
    this.salesService.getSalesData().subscribe((data: { plans: Plan[] }) => {
      this.plansData = data.plans;
    });
    this.getServices()

  }

  setCurrentPlan(plan: Plan) {
    this.planForm.setValue({
      name: plan.type,
      mensualPrice: plan.priceMensual,
      semestralPrice: plan.priceSemestral,
      anualPrice: plan.priceAnual,
      hasAccountLimit: plan.numAccounts !== -1,
      accountLimit: plan.numAccounts !== -1? plan.numAccounts : null,
      hasServiceLimit: plan.numservices !== -1,
      state: plan.status
    })
  }

  submitPlan(id: string) {
    if (id === "crearPlan") {

    } else {
      
    }
  }

  createPlan() {
    
  }

  createPlanMensual(): void {
    
  }

  createPlanSemestral(): void {
    
  }

  createPlanAnual(): void {
    
  }

  setCurrentService(service: Service) {
    this.serviceForm.setValue({
      name: service.name,
      state: service.status
    })
  }

  removeCurrentService() {
    this.serviceForm.setValue({
      name: '',
      state: true
    })
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

    if (id == "crearServicio") {
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
