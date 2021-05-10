import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaygroundhomeComponent } from './playgroundhome.component';

describe('PlaygroundhomeComponent', () => {
  let component: PlaygroundhomeComponent;
  let fixture: ComponentFixture<PlaygroundhomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaygroundhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
