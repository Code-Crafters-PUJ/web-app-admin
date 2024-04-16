import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMarketingComponent } from './general-marketing.component';

describe('GeneralMarketingComponent', () => {
  let component: GeneralMarketingComponent;
  let fixture: ComponentFixture<GeneralMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
