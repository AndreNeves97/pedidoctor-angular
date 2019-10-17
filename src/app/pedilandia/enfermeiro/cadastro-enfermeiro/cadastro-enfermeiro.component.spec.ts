import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEnfermeiroComponent } from './cadastro-enfermeiro.component';

describe('CadastroEnfermeiroComponent', () => {
  let component: CadastroEnfermeiroComponent;
  let fixture: ComponentFixture<CadastroEnfermeiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEnfermeiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEnfermeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
