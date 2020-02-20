import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomadicIntroductionComponent } from './nomadic-introduction.component';

describe('NomadicIntroductionComponent', () => {
  let component: NomadicIntroductionComponent;
  let fixture: ComponentFixture<NomadicIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomadicIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomadicIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
