import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const hasRoleGuardGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService)
  const router = inject(Router)

  const account = storageService.getSavedAccount()

  if (account && account.role != route.data['role']){
    router.navigate(['/login'])
  }
  
  return true
};
