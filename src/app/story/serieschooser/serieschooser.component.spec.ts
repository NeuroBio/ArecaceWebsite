import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesChooserComponent } from './serieschooser.component';

describe('SeriesChooserComponent', () => {
  let component: SeriesChooserComponent;
  let fixture: ComponentFixture<SeriesChooserComponent>;

  beforeEach(async(() => {
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
