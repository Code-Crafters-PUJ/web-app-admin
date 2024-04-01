import {RouterModule, Routes} from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { BillingCompanyComponent } from './pages/sales-page/components/billing-company/billing-company.component';
import {NgModule} from "@angular/core";
import {SalesPageComponent} from "./pages/sales-page/sales-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
   /*{
       
        path: 'path',
        component: PathComponent,
        canActivate: [isAuthenticatedGuard, hasRoleGuard],
        data:{
        role: 'role',
        }
      
    }*/
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
      { path: 'general', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  
];
