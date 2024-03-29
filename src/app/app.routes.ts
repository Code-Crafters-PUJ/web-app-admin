import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { hasRoleGuard } from './guards/has-role.guard';

export const routes: Routes = [
    { path: 'login', 
      component: LoginPageComponent,
      canActivate: [hasRoleGuard],
      data:{
        role: 'Admin',
      }
    }

  ];