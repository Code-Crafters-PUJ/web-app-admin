import { TestBed } from '@angular/core/testing';

import { ModulsService } from './moduls.service';

describe('ModulsService', () => {
  let service: ModulsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
