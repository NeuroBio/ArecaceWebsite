import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasMainComponent } from './extrasmain.component';

describe('ExtrasMainComponent', () => {
  let component: ExtrasMainComponent;
  let fixture: ComponentFixture<ExtrasMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrasMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
