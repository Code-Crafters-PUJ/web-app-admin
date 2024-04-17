import { RouterModule, Routes } from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { BillingCompanyComponent } from './pages/sales-page/components/billing-company/billing-company.component';
import { NgModule } from "@angular/core";
import { SalesPageComponent } from "./pages/sales-page/sales-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { SupportPageComponent } from "./pages/support-page/support-page.component";
import { MarketingPageComponent } from "./pages/marketing-page/marketing-page.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home/admin', canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"ADMIN"',
    },
    children: [
      { path: 'general', component: GeneralPageComponent },
      { path: 'accounts', component: GeneralPageComponent },
      { path: 'accounts/', component: GeneralPageComponent },
      { path: 'accounts/new', component: GeneralPageComponent },
      { path: 'accounts/modify', component: GeneralPageComponent },
      { path: 'generalSales', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
      { path: 'settings', component: SalesPageComponent },
      { path: 'benefits', component: SalesPageComponent },
      { path: 'generalSupport', component: SupportPageComponent },
      { path: 'requests', component: SupportPageComponent },
      { path: 'requests/company', component: SupportPageComponent },
      { path: 'generalMarketing', component: MarketingPageComponent },
      { path: 'requestsMarketing', component: MarketingPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  {
    path: 'home/accounts', canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"VENTAS"',
    },
    children: [
      { path: 'general', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
      { path: 'settings', component: SalesPageComponent },
      { path: 'benefits', component: SalesPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  {
    path: 'home/support', canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"SOPORTE"',
    },
    children: [
      { path: 'general', component: SupportPageComponent },
      { path: 'requests', component: SupportPageComponent },
      { path: 'requests/company', component: SupportPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  {
    path: 'home/marketing', canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"MARKETING"',
    },
    children: [
      { path: 'general', component: MarketingPageComponent },
      { path: 'requestsMarketing', component: MarketingPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },

];
