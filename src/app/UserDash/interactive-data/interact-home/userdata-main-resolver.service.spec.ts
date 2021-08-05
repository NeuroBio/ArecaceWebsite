import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { UserdataMainResolverService } from './userdata-main-resolver.service';

describe('UserdataMainResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth
    ]
  }));

  it('should be created', () => {
    const service: UserdataMainResolverService = TestBed.inject(UserdataMainResolverService);
    expect(service).toBeTruthy();
  });
});
