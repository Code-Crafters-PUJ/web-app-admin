import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsSupportComponent } from './requests-support.component';

describe('RequestsSupportComponent', () => {
  let component: RequestsSupportComponent;
  let fixture: ComponentFixture<RequestsSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
