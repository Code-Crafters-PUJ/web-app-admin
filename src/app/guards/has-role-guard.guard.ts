import { CanActivateFn } from '@angular/router';

export const hasRoleGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
