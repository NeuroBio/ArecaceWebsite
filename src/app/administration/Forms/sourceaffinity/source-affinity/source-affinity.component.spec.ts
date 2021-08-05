import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { SourceAffinityComponent } from './source-affinity.component';

describe('SourceAffinityComponent', () => {
  let component: SourceAffinityComponent;
  let fixture: ComponentFixture<SourceAffinityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAffinityComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        FormBuilder,
        AngularFireAuth,
        AngularFireStorage
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceAffinityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
