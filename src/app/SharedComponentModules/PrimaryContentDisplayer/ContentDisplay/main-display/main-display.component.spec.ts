import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainDisplayComponent } from './main-display.component';

describe('MainDisplayComponent', () => {
  let component: MainDisplayComponent;
  let fixture: ComponentFixture<MainDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
