import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cambiarContraseniaComponent } from './cambiar-contrasenia.component';

describe('CambiarContraseniaComponent', () => {
  let component: cambiarContraseniaComponent;
  let fixture: ComponentFixture<cambiarContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cambiarContraseniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(cambiarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
