import {RouterModule, Routes} from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { BillingCompanyComponent } from './pages/sales-page/components/billing-company/billing-company.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: 'home/admin',
    children: [
      { path: 'general', component: GeneralPageComponent },
      { path: 'accounts', component: GeneralPageComponent },
      { path: 'manage-account', component: GeneralPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  {
    path: 'home/sales',
    children: [
      { path: 'general', component: GeneralPageComponent },
      { path: 'billing', component: BillingCompanyComponent },
      { path: 'billing/company', component: GeneralPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },

];
