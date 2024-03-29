import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeriesChooserComponent } from './serieschooser.component';

describe('SeriesChooserComponent', () => {
  let component: SeriesChooserComponent;
  let fixture: ComponentFixture<SeriesChooserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
