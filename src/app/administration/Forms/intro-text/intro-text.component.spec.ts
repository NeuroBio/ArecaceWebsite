import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntroTextComponent } from './intro-text.component';

describe('IntroTextComponent', () => {
  let component: IntroTextComponent;
  let fixture: ComponentFixture<IntroTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTextComponent ]
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
