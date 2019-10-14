import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooseNotesFormComponent } from './loose-notes-form.component';

describe('LooseNotesFormComponent', () => {
  let component: LooseNotesFormComponent;
  let fixture: ComponentFixture<LooseNotesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooseNotesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooseNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
