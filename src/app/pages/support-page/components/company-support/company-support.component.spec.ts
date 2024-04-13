import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySupportComponent } from './company-support.component';

describe('CompanySupportComponent', () => {
  let component: CompanySupportComponent;
  let fixture: ComponentFixture<CompanySupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
