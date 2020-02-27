import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractHomeComponent } from './interact-home.component';

describe('InteractHomeComponent', () => {
  let component: InteractHomeComponent;
  let fixture: ComponentFixture<InteractHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
