import {RouterModule, Routes} from '@angular/router';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
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

];