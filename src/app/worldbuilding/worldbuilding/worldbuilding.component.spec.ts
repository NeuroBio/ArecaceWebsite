import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldbuildingComponent } from './worldbuilding.component';

describe('WorldbuildingComponent', () => {
  let component: WorldbuildingComponent;
  let fixture: ComponentFixture<WorldbuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldbuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldbuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
