import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMedicoComponent } from './cadastro-medico.component';

describe('CadastroMedicoComponent', () => {
  let component: CadastroMedicoComponent;
  let fixture: ComponentFixture<CadastroMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
