import { TestBed } from '@angular/core/testing';

import { EnfermeiroService } from './enfermeiro.service';

describe('EnfermeiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnfermeiroService = TestBed.get(EnfermeiroService);
    expect(service).toBeTruthy();
  });
});
