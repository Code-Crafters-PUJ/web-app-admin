import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { salesGuardGuard } from './sales-guard.guard';

describe('salesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => salesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
