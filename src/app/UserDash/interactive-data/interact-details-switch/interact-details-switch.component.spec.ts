import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';

import {InteractDetailsSwitchComponent } from './interact-details-switch.component';

describe('InteractDetailsSwitchComponent', () => {
  let component: InteractDetailsSwitchComponent;
  let fixture: ComponentFixture<InteractDetailsSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractDetailsSwitchComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        AngularFireStorageModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractDetailsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
