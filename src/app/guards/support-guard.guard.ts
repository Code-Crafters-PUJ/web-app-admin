import { CanActivateFn } from '@angular/router';

export const supportGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
