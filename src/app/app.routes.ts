import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { hasRoleGuard } from './guards/has-role.guard';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

export const routes: Routes = [

    { path: 'login', 
      component: LoginPageComponent,
    }
    /*{
       
        path: 'path',
        component: PathComponent,
        canActivate: [isAuthenticatedGuard, hasRoleGuard],
        data:{
        role: 'role',
        }
      
    }*/

  ];