import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConsultaComponent } from './cadastro-consulta.component';

describe('CadastroConsultaComponent', () => {
  let component: CadastroConsultaComponent;
  let fixture: ComponentFixture<CadastroConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
