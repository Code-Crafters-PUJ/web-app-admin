import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBenefitsComponent } from './sales-benefits.component';

describe('SalesBenefitsComponent', () => {
  let component: SalesBenefitsComponent;
  let fixture: ComponentFixture<SalesBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
