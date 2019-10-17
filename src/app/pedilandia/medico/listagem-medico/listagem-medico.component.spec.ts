import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMedicoComponent } from './listagem-medico.component';

describe('ListagemMedicoComponent', () => {
  let component: ListagemMedicoComponent;
  let fixture: ComponentFixture<ListagemMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
