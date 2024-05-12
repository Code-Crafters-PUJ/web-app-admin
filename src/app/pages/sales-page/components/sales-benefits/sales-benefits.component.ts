import { Component, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Trials } from '../../../../models/sales-models/trial';
import { SalesService } from '../../../../services/sales-services/sales/sales.service';
import { Coupon } from '../../../../models/sales-models/coupon';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Client } from '../../../../models/sales-models/client';
import { ClientService } from '../../../../services/sales-services/client/client.service';
import { Plan } from '../../../../models/sales-models/plan';

@Component({
  selector: 'app-sales-benefits',
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sales-benefits.component.html',
  styleUrl: './sales-benefits.component.css'
})
export class SalesBenefitsComponent implements OnInit {
  public trials: Trials[] = [];
  public coupons: Coupon[] = [];
  public currentCoupon: Coupon | null = null;
  public clients: Client[] = [];
  public plans: Plan[] = [];

  trialForm = this.formBuilder.group({
    name: ['', Validators.required],
    plan: ['', Validators.required],
    duration: [0, Validators.required],
    state: ['', Validators.required],
  });
  couponForm = this.formBuilder.group({
    client: ['', Validators.required],
    discount: [10, Validators.required],
    duration: [0, Validators.required],
    expirationDate: ['', Validators.required],
  });

  constructor(
    private salesService: SalesService,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) { }

  getTrials() {
    this.salesService.getTrials().subscribe((data) => {
      this.trials = data.trials;
    });
  }

  getCoupons() {
    this.salesService.getCoupons().subscribe((data) => {
      this.coupons = data.coupons;
      this.coupons.forEach(element => {
        element.expirationDate = new Date(element.expirationDate).toLocaleDateString();
      });
    });
  }

  ngOnInit(): void {
    this.getTrials()
    this.getCoupons()
    this.clientService.getClients().subscribe((data) => {
      this.clients = data.clients
    })
    this.salesService.getSalesData().subscribe((data) => {
      this.plans = data.plans
    })
  }

  setCurrentTrial(trial: Trials) {
    this.trialForm.setValue({
      name: trial.client.companyName,
      plan: trial.planType,
      duration: trial.duration,
      state: trial.state
    })
  }

  removeCurrentTrial() {
    this.trialForm.setValue({
      name: '',
      plan: '',
      duration: 0,
      state: ''
    })
  }

  submitTrial(id: string) {
    if (id === "crearTrial") {
      this.createTrial()
    } else {
      this.removeTrial()
    }
  }

  createTrial() {
    const client = this.trialForm.value.name!
    if (this.trials.find((trial) => trial.client.companyName === client)) {
      const trial = this.trials.find((trial) => trial.client.companyName === client)!
      this.salesService.updateTrials(trial.id, {
        plan: this.trialForm.value.plan!,
        duration: this.trialForm.value.duration!,
        state: this.trialForm.value.state!
      }).subscribe((data) => {
        console.log(data);
        this.getTrials();
      })
    } else {
      if (this.trialForm.invalid) {
        Swal.fire({
          title: "Trial",
          text: "Llene por favor todos los campos",
          icon: "error"
        });
        return
      }
      this.salesService.createTrials({
        companyName: this.trialForm.value.name!,
        plan: this.trialForm.value.plan!,
        duration: this.trialForm.value.duration!,
        state: this.trialForm.value.state!
      }).subscribe((data) => {
        console.log(data);
        this.getTrials();
        this.removeCurrentTrial();
      })
    }
  }

  removeTrial() {
    const client = this.trialForm.value.name!
    if (!this.trials.find((trial) => trial.client.companyName === client)) {
      Swal.fire({
        title: "Trial",
        text: "No existe un trial con ese nombre de usuario asociado",
        icon: "error"
      })
      return
    }
    const trial = this.trials.find((trial) => trial.client.companyName === client)!
    this.salesService.deleteTrials(trial.id).subscribe((data) => {
      console.log(data);
      this.getTrials();
      this.removeCurrentTrial();
    })
  }

  setCurrentCoupon(coupon: Coupon) {
    this.currentCoupon = coupon
    this.couponForm.setValue({
      client: coupon.client.companyName,
      discount: coupon.discount,
      duration: coupon.duration,
      expirationDate: this.dateFromLocal(coupon.expirationDate.toString())
    })
  }

  dateFromLocal(date: string): string {
    const day = parseInt(date.substring(0, 2));
    const month = parseInt(date.substring(3, 5));
    const year = parseInt(date.substring(5, 12));

    return new Date(year, month - 1, day).toISOString().split('T')[0];
  }

  removeCurrentCoupon() {
    this.currentCoupon = null
    this.couponForm.setValue({
      client: null,
      discount: 10,
      duration: 0,
      expirationDate: null
    })
  }

  submitCoupon(id: string) {
    if (id == "crearCupon") {
      this.createCoupon()
    } else {
      this.removeCoupon()
    }
  }

  createCoupon() {
    if (this.currentCoupon) {
      this.salesService.updateCoupon(this.currentCoupon.code, {
        companyName: this.couponForm.value.client || undefined,
        discount: this.couponForm.value.discount || undefined,
        duration: this.couponForm.value.duration || undefined,
        expirationDate: this.couponForm.value.expirationDate || undefined,
      }).subscribe((data) => {
        console.log(data);
        this.getCoupons();
      })
    } else {
      if (this.couponForm.invalid) {
        Swal.fire({
          title: "Cupon",
          text: "Llene por favor todos los campos",
          icon: "error"
        });
        return
      }
      this.salesService.createCoupon({
        companyName: this.couponForm.value.client!,
        discount: this.couponForm.value.discount!,
        duration: this.couponForm.value.duration!,
        expirationDate: this.couponForm.value.expirationDate!
      }).subscribe((data) => {
        console.log(data);
        this.getCoupons();
        this.removeCurrentCoupon();
      })
    }
  }

  removeCoupon() {
    if (!this.currentCoupon) {
      Swal.fire({
        title: "Cupon",
        text: "Seleccione un cupon para eliminar",
        icon: "error"
      });
      return
    }
    this.salesService.deleteCoupon(this.currentCoupon.code).subscribe((data) => {
      console.log(data);
      this.getCoupons();
      this.removeCurrentCoupon();
    })
  }
}
