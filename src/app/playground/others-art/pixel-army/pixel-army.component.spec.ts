import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { PixelArmyComponent } from './pixel-army.component';

describe('PixelArmyComponent', () => {
  let component: PixelArmyComponent;
  let fixture: ComponentFixture<PixelArmyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelArmyComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        AngularFireStorage,
        AngularFirestore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelArmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
