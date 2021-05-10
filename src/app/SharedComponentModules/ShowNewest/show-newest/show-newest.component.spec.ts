import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowNewestComponent } from './show-newest.component';

describe('ShowNewestComponent', () => {
  let component: ShowNewestComponent;
  let fixture: ComponentFixture<ShowNewestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNewestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
