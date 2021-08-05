import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { NomadicSyntaxComponent } from './nomadic-syntax.component';

describe('NomadicSyntaxComponent', () => {
  let component: NomadicSyntaxComponent;
  let fixture: ComponentFixture<NomadicSyntaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NomadicSyntaxComponent ],
      providers: [
        AngularFireStorage
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomadicSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
