import { TestBed } from '@angular/core/testing';

import { TextProvider } from './textprovider.service';

describe('TextProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextProvider = TestBed.inject(TextProvider);
    expect(service).toBeTruthy();
  });
});
