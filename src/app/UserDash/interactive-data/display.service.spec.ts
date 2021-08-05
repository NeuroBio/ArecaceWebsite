import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { DisplayService } from './display.service';

describe('DisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth
    ]
  }));

  it('should be created', () => {
    const service: DisplayService = TestBed.inject(DisplayService);
    expect(service).toBeTruthy();
  });
});
