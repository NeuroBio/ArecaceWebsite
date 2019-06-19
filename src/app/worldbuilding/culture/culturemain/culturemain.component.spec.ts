import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturemainComponent } from './culturemain.component';

describe('CulturemainComponent', () => {
  let component: CulturemainComponent;
  let fixture: ComponentFixture<CulturemainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturemainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
