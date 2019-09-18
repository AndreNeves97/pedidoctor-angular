import { TestBed } from '@angular/core/testing';

import { ConsultaService } from './consulta.service';

describe('ConsultaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service).toBeTruthy();
  });
});
