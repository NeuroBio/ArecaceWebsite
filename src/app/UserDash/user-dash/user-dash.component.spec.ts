import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDashComponent } from './user-dash.component';

describe('UserDashComponent', () => {
  let component: UserDashComponent;
  let fixture: ComponentFixture<UserDashComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
