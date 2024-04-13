import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSupportComponent } from './general-support.component';

describe('GeneralSupportComponent', () => {
  let component: GeneralSupportComponent;
  let fixture: ComponentFixture<GeneralSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
