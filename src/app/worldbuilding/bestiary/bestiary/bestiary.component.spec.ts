import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BestiaryComponent } from './bestiary.component';

describe('BestiaryComponent', () => {
  let component: BestiaryComponent;
  let fixture: ComponentFixture<BestiaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
