import { Routes } from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { CompanyInfoComponent } from './pages/company-info/company-info.component';
import { SalesDataComponent } from "./pages/sales-data/sales-data.component";
import { SalesMailComponent } from "./pages/sales-mail/sales-mail.component";
import { BillingManagementComponent } from "./pages/billing-management/billing-management.component";

export const routes: Routes = [
  { path: 'general', component: GeneralPageComponent },
  { path: 'company_info', component: CompanyInfoComponent },
  { path: 'sales_data', component: SalesDataComponent },
  { path: 'sales_mail', component: SalesMailComponent },
  { path: 'billing', component: BillingManagementComponent }
];
