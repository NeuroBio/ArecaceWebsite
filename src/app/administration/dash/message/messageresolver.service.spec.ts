import { TestBed } from '@angular/core/testing';

import { MessageresolverService } from './messageresolver.service';

describe('MessageresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageresolverService = TestBed.get(MessageresolverService);
    expect(service).toBeTruthy();
  });
});
