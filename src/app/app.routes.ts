import {RouterModule, Routes} from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { BillingCompanyComponent } from './pages/sales-page/components/billing-company/billing-company.component';
import {NgModule} from "@angular/core";
import {SalesPageComponent} from "./pages/sales-page/sales-page.component";

export const routes: Routes = [
  {
    path: 'home/admin',
    children: [
      { path: 'general', component: GeneralPageComponent },
      { path: 'accounts', component: GeneralPageComponent },
      { path: 'accounts/new', component: GeneralPageComponent },
      { path: 'accounts/modify', component: GeneralPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  {
    path: 'home/sales',
    children: [
<<<<<<< HEAD
      { path: 'general', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
=======
      { path: 'general', component: GeneralPageComponent },
      { path: 'billing', component: BillingCompanyComponent },
      { path: 'billing/company', component: GeneralPageComponent },
>>>>>>> c1aa62633e8e01d7fa09be566fae5608762f5984
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },

];
