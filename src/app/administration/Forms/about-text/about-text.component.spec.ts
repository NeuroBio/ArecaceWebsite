import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutTextComponent } from './about-text.component';

describe('AboutTextComponent', () => {
  let component: AboutTextComponent;
  let fixture: ComponentFixture<AboutTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
