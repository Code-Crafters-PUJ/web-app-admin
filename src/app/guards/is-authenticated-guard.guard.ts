import { CanActivateFn } from '@angular/router';

export const isAuthenticatedGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
