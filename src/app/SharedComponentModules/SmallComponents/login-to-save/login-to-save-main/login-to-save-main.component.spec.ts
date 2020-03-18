import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToSaveMainComponent } from './login-to-save-main.component';

describe('LoginToSaveMainComponent', () => {
  let component: LoginToSaveMainComponent;
  let fixture: ComponentFixture<LoginToSaveMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginToSaveMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginToSaveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
