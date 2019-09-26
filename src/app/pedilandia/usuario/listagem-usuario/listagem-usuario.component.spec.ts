import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemUsuarioComponent } from './listagem-usuario.component';

describe('ListagemUsuarioComponent', () => {
  let component: ListagemUsuarioComponent;
  let fixture: ComponentFixture<ListagemUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
