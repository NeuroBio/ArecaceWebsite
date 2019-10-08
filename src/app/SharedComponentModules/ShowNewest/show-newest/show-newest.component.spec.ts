import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNewestComponent } from './show-newest.component';

describe('ShowNewestComponent', () => {
  let component: ShowNewestComponent;
  let fixture: ComponentFixture<ShowNewestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNewestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
