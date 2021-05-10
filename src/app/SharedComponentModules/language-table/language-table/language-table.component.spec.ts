import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageTableComponent } from './language-table.component';

describe('LanguageTableComponent', () => {
  let component: LanguageTableComponent;
  let fixture: ComponentFixture<LanguageTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
