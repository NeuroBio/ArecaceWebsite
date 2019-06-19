import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorydisplayComponent } from './storydisplay.component';

describe('StorydisplayComponent', () => {
  let component: StorydisplayComponent;
  let fixture: ComponentFixture<StorydisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorydisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorydisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
