import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { UpdateFormComponent } from './update-form.component';

describe('UpdateFormComponent', () => {
  let component: UpdateFormComponent;
  let fixture: ComponentFixture<UpdateFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        FormBuilder,
        AngularFireAuth,
        AngularFireStorage,
        AngularFirestore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
