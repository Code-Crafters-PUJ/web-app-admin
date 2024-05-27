import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
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
  public selectedPlanServices: string[] = [];

  accountLimit: boolean = false;

  planForm = this.formBuilder.group({
    name: ['', Validators.required],
    mensualPrice: [0, Validators.required],
    semestralPrice: [0, Validators.required],
    anualPrice: [0, Validators.required],
    hasAccountLimit: [false, Validators.required],
    accountLimit: [0, Validators.required],
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
    this.planForm.patchValue({
      accountLimit: null,
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
      state: plan.state
    })
    console.log(plan.services)
    this.selectPlanServices(plan.services)
  }

  removeCurrentPlan() {
    this.planForm.setValue({
      name: null,
      mensualPrice: 0,
      semestralPrice: 0,
      anualPrice: 0,
      hasAccountLimit: false,
      accountLimit: null,
      state: '',
    })
    this.clearSelectedPlanServices()
  }

  submitPlan(id: string) {
    if (id === "crearPlan") {
      this.createPlan()
    } else {
      this.removePlan()
    }
  }

  selectPlanServices(services: {service: Service}[]) {
    this.clearSelectedPlanServices()
    services.forEach(data => {
      console.log(data.service.name)
      const input: any = document.getElementById(data.service.name + 'input')
      input.checked = true
    })
  }

  clearSelectedPlanServices() {
    this.servicesData.forEach(service => {
      const input: any = document.getElementById(service.name + 'input')
      input.checked = false
    })
  }

  getSelectedPlanServices() {
    this.selectedPlanServices = [];
    this.servicesData.forEach(service => {
      const input: any = document.getElementById(service.name + 'input')
      if (input?.checked) {
        this.selectedPlanServices.push(document.getElementById(service.name)?.textContent as string)
      }
    })
  }

  createPlan() {
    this.getSelectedPlanServices()
    
    const type = this.planForm.value.name!
    if (this.plansData.find((plan) => plan.type === type)) {
      this.salesService.updatePlan(type, {
        anualPrice: this.planForm.value.anualPrice!,
        mensualPrice: this.planForm.value.mensualPrice!,
        semestralPrice: this.planForm.value.semestralPrice!,
        state: this.planForm.value.state!,
        numAccounts: this.planForm.value.hasAccountLimit! ? this.planForm.value.accountLimit! : -1,
        services: this.selectedPlanServices
      }).subscribe((data) => {
        console.log(data);
        this.getPlans()
      })
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
        numAccounts: this.planForm.value.hasAccountLimit! ? this.planForm.value.accountLimit! : -1,
        services: this.selectedPlanServices
      }).subscribe((data) => {
        console.log(data);
        this.getPlans()
        this.removeCurrentPlan()
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
    this.salesService.deletePlan(type).subscribe((data) => {
      console.log(data);
      this.getPlans()
      this.removeCurrentPlan()
    })
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
        this.removeCurrentService()
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
      this.removeCurrentService()
    })
  }
}
