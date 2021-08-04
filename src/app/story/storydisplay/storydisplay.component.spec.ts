import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StorydisplayComponent } from './storydisplay.component';

describe('StorydisplayComponent', () => {
  let component: StorydisplayComponent;
  let fixture: ComponentFixture<StorydisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StorydisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorydisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
