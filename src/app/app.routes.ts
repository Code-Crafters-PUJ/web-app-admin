import { Routes } from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { SupportPageComponent } from './pages/support-page/support-page.component';
import { MarketingPageComponent } from './pages/marketing-page/marketing-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { cambiarContraseniaComponent } from './pages/cambiar-contrasenia/cambiar-contrasenia.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home/admin',
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"Admin"',
    },
    children: [
      { path: 'general', component: GeneralPageComponent },
      { path: 'accounts', component: GeneralPageComponent },
      { path: 'accounts/', component: GeneralPageComponent },
      { path: 'accounts/new', component: GeneralPageComponent },
      { path: 'accounts/modify/:accountId', component: GeneralPageComponent },
      { path: 'generalSales', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
      { path: 'settings', component: SalesPageComponent },
      { path: 'benefits', component: SalesPageComponent },
      { path: 'generalSupport', component: SupportPageComponent },
      { path: 'requests', component: SupportPageComponent },
      { path: 'requests/company/:accountId', component: SupportPageComponent },
      { path: 'generalMarketing', component: MarketingPageComponent },
      { path: 'requestsMarketing', component: MarketingPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
  {
    path: 'home/accounts',
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"Ventas"',
    },
    children: [
      { path: 'general', component: SalesPageComponent },
      { path: 'billing', component: SalesPageComponent },
      { path: 'billing/company', component: SalesPageComponent },
      { path: 'settings', component: SalesPageComponent },
      { path: 'benefits', component: SalesPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
  {
    path: 'home/support',
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"Soporte"',
    },
    children: [
      { path: 'general', component: SupportPageComponent },
      { path: 'requests', component: SupportPageComponent },
      { path: 'requests/company/:accountId', component: SupportPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
  {
    path: 'home/marketing',
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"Marketing"',
    },
    children: [
      { path: 'general', component: MarketingPageComponent },
      { path: 'requestsMarketing', component: MarketingPageComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: 'all',
        component: MenuComponent,
      },
      {
        path: 'CambioContrasenia',
        component: cambiarContraseniaComponent,
      },
    ],
  },
  {
    path: 'home/Monitoreo',
    canActivate: [isAuthenticatedGuard, hasRoleGuard],
    data: {
      role: '"Monitoreo"',
    },
    children: [
      { path: 'accounts', component: GeneralPageComponent },
      { path: 'accounts/', component: GeneralPageComponent },
      { path: 'accounts/new', component: GeneralPageComponent },
      { path: 'accounts/modify/:accountId', component: GeneralPageComponent },
    ],
  },
];
