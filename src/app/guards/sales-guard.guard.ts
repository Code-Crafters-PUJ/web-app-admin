import { CanActivateFn } from '@angular/router';

export const salesGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
