import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAccountsComponent } from './table-accounts.component';

describe('TableAccountsComponent', () => {
  let component: TableAccountsComponent;
  let fixture: ComponentFixture<TableAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
