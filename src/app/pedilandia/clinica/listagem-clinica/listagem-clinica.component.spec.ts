import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemClinicaComponent } from './listagem-clinica.component';

describe('ListagemClinicaComponent', () => {
  let component: ListagemClinicaComponent;
  let fixture: ComponentFixture<ListagemClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
