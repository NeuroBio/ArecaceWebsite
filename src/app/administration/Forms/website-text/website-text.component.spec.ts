import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTextComponent } from './website-text.component';

describe('WebsiteTextComponent', () => {
  let component: WebsiteTextComponent;
  let fixture: ComponentFixture<WebsiteTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
