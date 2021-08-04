import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaqTextComponent } from './faq-text.component';

describe('FaqTextComponent', () => {
  let component: FaqTextComponent;
  let fixture: ComponentFixture<FaqTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
