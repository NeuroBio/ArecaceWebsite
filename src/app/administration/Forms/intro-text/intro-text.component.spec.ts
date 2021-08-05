import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { IntroTextComponent } from './intro-text.component';

describe('IntroTextComponent', () => {
  let component: IntroTextComponent;
  let fixture: ComponentFixture<IntroTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTextComponent ],
      providers: [
        FormBuilder,
        AngularFireStorage
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
