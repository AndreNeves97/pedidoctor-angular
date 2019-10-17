import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEnfermeiroComponent } from './listagem-enfermeiro.component';

describe('ListagemEnfermeiroComponent', () => {
  let component: ListagemEnfermeiroComponent;
  let fixture: ComponentFixture<ListagemEnfermeiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemEnfermeiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemEnfermeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
