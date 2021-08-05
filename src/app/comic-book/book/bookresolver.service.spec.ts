import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';

import { BookResolverService } from './bookresolver.service';

describe('BookResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: BookResolverService = TestBed.inject(BookResolverService);
    expect(service).toBeTruthy();
  });
});
