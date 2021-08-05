import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { MessageresolverService } from './messageresolver.service';

describe('MessageresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
    ],
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: MessageresolverService = TestBed.inject(MessageresolverService);
    expect(service).toBeTruthy();
  });
});
