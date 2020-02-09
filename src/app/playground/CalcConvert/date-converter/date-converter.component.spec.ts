import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateConverterComponent } from './date-converter.component';

describe('DateConverterComponent', () => {
  let component: DateConverterComponent;
  let fixture: ComponentFixture<DateConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
