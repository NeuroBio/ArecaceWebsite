import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFormComponent } from './sourceform.component';

describe('SourceFormComponent', () => {
  let component: SourceFormComponent;
  let fixture: ComponentFixture<SourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
