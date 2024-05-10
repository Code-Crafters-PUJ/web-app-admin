import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMarketingComponent } from './requests-marketing.component';

describe('RequestsMarketingComponent', () => {
  let component: RequestsMarketingComponent;
  let fixture: ComponentFixture<RequestsMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
