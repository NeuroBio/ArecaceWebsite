import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { StoryResolver1Service } from './storyresolver1.service';

describe('StoryResolver1Service', () => {
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
    const service: StoryResolver1Service = TestBed.inject(StoryResolver1Service);
    expect(service).toBeTruthy();
  });
});
