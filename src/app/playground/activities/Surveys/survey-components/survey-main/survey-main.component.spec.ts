import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { SurveyMainComponent } from './survey-main.component';

describe('SurveyMainComponent', () => {
  let component: SurveyMainComponent;
  let fixture: ComponentFixture<SurveyMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMainComponent ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        ActivatedRoute,
        AngularFireAuth,
        AngularFireStorage,
        AngularFirestore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
