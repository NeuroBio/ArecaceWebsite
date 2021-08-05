import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { TravelorsGuideComponent } from './travelorsguide.component';

describe('TravelorsguideComponent', () => {
  let component: TravelorsGuideComponent;
  let fixture: ComponentFixture<TravelorsGuideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelorsGuideComponent ],
      providers: [
        AngularFireStorage
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelorsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
