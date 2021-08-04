import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadserviceComponent } from './badservice.component';

describe('BadserviceComponent', () => {
  let component: BadserviceComponent;
  let fixture: ComponentFixture<BadserviceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
