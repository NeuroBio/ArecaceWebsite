import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsDisplayComponent } from './details-display.component';

describe('SSdetailsComponent', () => {
  let component: DetailsDisplayComponent;
  let fixture: ComponentFixture<DetailsDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
