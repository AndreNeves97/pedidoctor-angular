import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClinicaComponent } from './main-clinica.component';

describe('MainClinicaComponent', () => {
  let component: MainClinicaComponent;
  let fixture: ComponentFixture<MainClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
