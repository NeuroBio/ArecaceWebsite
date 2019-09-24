import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubmitComponent } from './page-submit.component';

describe('PageSubmitComponent', () => {
  let component: PageSubmitComponent;
  let fixture: ComponentFixture<PageSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
