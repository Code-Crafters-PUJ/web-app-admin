import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCompanyComponent } from './billing-company.component';

describe('BillingCompanyComponent', () => {
  let component: BillingCompanyComponent;
  let fixture: ComponentFixture<BillingCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
