import { CanActivateFn } from '@angular/router';

export const marketingGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
