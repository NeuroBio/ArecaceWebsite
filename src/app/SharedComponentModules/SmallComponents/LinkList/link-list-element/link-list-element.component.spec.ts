import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkListElementComponent } from './link-list-element.component';

describe('LinkListElementComponent', () => {
  let component: LinkListElementComponent;
  let fixture: ComponentFixture<LinkListElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
