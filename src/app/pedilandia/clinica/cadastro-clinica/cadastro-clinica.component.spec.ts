import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClinicaComponent } from './cadastro-clinica.component';

describe('CadastroClinicaComponent', () => {
  let component: CadastroClinicaComponent;
  let fixture: ComponentFixture<CadastroClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
