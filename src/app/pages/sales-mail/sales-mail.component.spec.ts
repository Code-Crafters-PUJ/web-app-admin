import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMailComponent } from './sales-mail.component';

describe('SalesMailComponent', () => {
  let component: SalesMailComponent;
  let fixture: ComponentFixture<SalesMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
