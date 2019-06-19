import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlowupmasterComponent } from './blowupmaster.component';

describe('BlowupmasterComponent', () => {
  let component: BlowupmasterComponent;
  let fixture: ComponentFixture<BlowupmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlowupmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlowupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
