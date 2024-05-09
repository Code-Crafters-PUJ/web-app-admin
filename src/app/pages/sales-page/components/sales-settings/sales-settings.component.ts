import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { PlanDTO } from '../../../../DTO/plan.dto';
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

  accountLimit: boolean = false;

  planForm = this.formBuilder.group({
    name: ['', Validators.required],
    mensualPrice: [0, Validators.required],
    semestralPrice: [0, Validators.required],
    anualPrice: [0, Validators.required],
    hasAccountLimit: [false, Validators.required],
    accountLimit: [0, Validators.required],
    hasServiceLimit: [false, Validators.required],
    serviceLimit: [0, Validators.required],
    state: ['', Validators.required],
  });
  serviceForm = this.formBuilder.group({
    name: ['', Validators.required],
    state: ['', Validators.required],
  });

  constructor(
    private salesService: SalesService,
    //private serviceService: serviceService
    private formBuilder: FormBuilder,
  ) { }

  getPlans() {
    this.salesService.getSalesData().subscribe((data: { plans: Plan[] }) => {
      this.plansData = data.plans;
    });
  }

  getServices() {
    this.salesService.getServices().subscribe((data) => {
      this.servicesData = data.services;
      this.servicesData.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toLocaleDateString()
      })
    });
  }

  ngOnInit(): void {
    this.getPlans()
    this.getServices()
    this.setupCheckBoxes()
  }

  setupCheckBoxes() {
    this.planForm.get('accountLimit')?.disable();
    this.planForm.get('hasAccountLimit')?.valueChanges
      .subscribe(value => {
        if (value) {
          this.planForm.get('accountLimit')?.enable();
        } else {
          this.planForm.get('accountLimit')?.disable();
          this.planForm.patchValue({ accountLimit: null });
        }
      })
    this.planForm.get('serviceLimit')?.disable();
    this.planForm.get('hasServiceLimit')?.valueChanges
      .subscribe(value => {
        if (value) {
          this.planForm.get('serviceLimit')?.enable();
        } else {
          this.planForm.get('serviceLimit')?.disable();
          this.planForm.patchValue({ serviceLimit: null });
        }
      })
    this.planForm.patchValue({
      accountLimit: null,
      serviceLimit: null,
    })
  }

  setCurrentPlan(plan: Plan) {
    this.planForm.setValue({
      name: plan.type,
      mensualPrice: plan.mensualPrice,
      semestralPrice: plan.semestralPrice,
      anualPrice: plan.anualPrice,
      hasAccountLimit: plan.numAccounts !== -1,
      accountLimit: plan.numAccounts !== -1 ? plan.numAccounts : null,
      hasServiceLimit: plan.numServices !== -1,
      serviceLimit: plan.numServices !== -1 ? plan.numServices : null,
      state: plan.state
    })
  }

  removeCurrentPlan() {
    this.planForm.setValue({
      name: null,
      mensualPrice: 0,
      semestralPrice: 0,
      anualPrice: 0,
      hasAccountLimit: false,
      accountLimit: null,
      hasServiceLimit: false,
      serviceLimit: null,
      state: '',
    })
  }

  submitPlan(id: string) {
    if (id === "crearPlan") {
      this.createPlan()
    } else {
      this.removePlan()
    }
  }

  createPlan() {
    const type = this.planForm.value.name!
    if (this.plansData.find((plan) => plan.type === type)) {
    } else {
      if (this.planForm.invalid) {
        Swal.fire({
          title: "Plan",
          text: "Llene por favor todos los campos",
          icon: "error"
        });
        return
      }
      this.salesService.createPlan({
        type: this.planForm.value.name!,
        anualPrice: this.planForm.value.anualPrice!,
        mensualPrice: this.planForm.value.mensualPrice!,
        semestralPrice: this.planForm.value.semestralPrice!,
        state: this.planForm.value.state!,
        numAccounts: this.planForm.value.hasAccountLimit!? this.planForm.value.accountLimit! : -1,
        numServices: this.planForm.value.hasServiceLimit!? this.planForm.value.serviceLimit! : -1,
      }).subscribe((data) => {
        console.log(data);
        this.getPlans()
      })
    }
  }

  removePlan() {
    const type = this.planForm.value.name!
    if (!this.plansData.find((plan) => plan.type === type)) {
      Swal.fire({
        title: "Plan",
        text: "No existe un tipo de plan con ese nombre",
        icon: "error"
      })
      return
    }
  }

  setCurrentService(service: Service) {
    this.serviceForm.setValue({
      name: service.name,
      state: service.state
    })
  }

  removeCurrentService() {
    this.serviceForm.setValue({
      name: '',
      state: ''
    })
  }

  submitService(id: string) {
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
      if (this.serviceForm.invalid) {
        Swal.fire({
          title: "Servicio",
          text: "Llene por favor todos los campos",
          icon: "error"
        });
        return
      }
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
