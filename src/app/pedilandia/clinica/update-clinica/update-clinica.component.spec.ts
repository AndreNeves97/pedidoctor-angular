import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicaComponent } from './update-clinica.component';

describe('UpdateClinicaComponent', () => {
  let component: UpdateClinicaComponent;
  let fixture: ComponentFixture<UpdateClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
