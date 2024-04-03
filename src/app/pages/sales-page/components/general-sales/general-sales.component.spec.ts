import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSalesComponent } from './general-sales.component';

describe('GeneralSalesComponent', () => {
  let component: GeneralSalesComponent;
  let fixture: ComponentFixture<GeneralSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
