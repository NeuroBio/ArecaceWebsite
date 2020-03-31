import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLinkListComponent } from './master-link-list.component';

describe('MasterLinkListComponent', () => {
  let component: MasterLinkListComponent;
  let fixture: ComponentFixture<MasterLinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
