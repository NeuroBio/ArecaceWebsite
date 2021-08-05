import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { GuildFormComponent } from './guildform.component';

describe('GuildFormComponent', () => {
  let component: GuildFormComponent;
  let fixture: ComponentFixture<GuildFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildFormComponent ],
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
    fixture = TestBed.createComponent(GuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
