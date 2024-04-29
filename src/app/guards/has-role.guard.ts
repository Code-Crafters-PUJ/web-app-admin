import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/login-services/storage.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService)
  const router = inject(Router)


  const account = storageService.getSavedAccount()
  const roles=storageService.getPermissions()
  const admin="Admin"
  if(account)
    {
      if(account.role.replace(/"/g, '')==admin)
        {
          return true
        }
    }
  if(roles)
    {
      for(const rol of roles){
        if(rol.module_name==route.data['role'].replace(/"/g, ''))
        {
          if(rol.can_view)
            {
              return true
            }
            return false
          
        }
      }
    }
    router.navigate(['/login'])
    return false
};
