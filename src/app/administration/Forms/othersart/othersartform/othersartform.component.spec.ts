import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OthersArtFormComponent } from './othersartform.component';

describe('OthersArtFormComponent', () => {
  let component: OthersArtFormComponent;
  let fixture: ComponentFixture<OthersArtFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersArtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersArtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
