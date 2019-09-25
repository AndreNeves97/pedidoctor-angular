import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemConsultaComponent } from './listagem-consulta.component';

describe('ListagemConsultaComponent', () => {
  let component: ListagemConsultaComponent;
  let fixture: ComponentFixture<ListagemConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
