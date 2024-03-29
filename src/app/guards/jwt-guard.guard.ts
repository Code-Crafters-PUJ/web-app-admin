import { CanActivateFn } from '@angular/router';

export const jwtGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
