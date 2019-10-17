import { TestBed } from '@angular/core/testing';

import { ClinicaService } from './clinica.service';

describe('ClinicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicaService = TestBed.get(ClinicaService);
    expect(service).toBeTruthy();
  });
});
