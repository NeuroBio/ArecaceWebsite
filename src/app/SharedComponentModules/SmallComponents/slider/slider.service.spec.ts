import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { SliderService } from './slider.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFirestore } from '@angular/fire/firestore';

describe('SliderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage,
      AngularFirestore
    ]
  }));

  it('should be created', () => {
    const service: SliderService = TestBed.inject(SliderService);
    expect(service).toBeTruthy();
  });
});
