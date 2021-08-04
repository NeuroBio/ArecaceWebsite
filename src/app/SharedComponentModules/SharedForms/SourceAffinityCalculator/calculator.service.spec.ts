import { TestBed } from '@angular/core/testing';

import { SourceAbilityCalculatorService } from './source-ability-calculator.service';

describe('SourceAbilityCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceAbilityCalculatorService = TestBed.get(SourceAbilityCalculatorService);
    expect(service).toBeTruthy();
  });
});
