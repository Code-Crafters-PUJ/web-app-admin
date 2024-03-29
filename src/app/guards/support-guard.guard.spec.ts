import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { supportGuardGuard } from './support-guard.guard';

describe('supportGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => supportGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
