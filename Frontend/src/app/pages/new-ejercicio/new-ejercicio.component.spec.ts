import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEjercicioComponent } from './new-ejercicio.component';

describe('NewEjercicioComponent', () => {
  let component: NewEjercicioComponent;
  let fixture: ComponentFixture<NewEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEjercicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
