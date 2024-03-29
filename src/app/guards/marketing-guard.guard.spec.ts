import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { marketingGuardGuard } from './marketing-guard.guard';

describe('marketingGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => marketingGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
