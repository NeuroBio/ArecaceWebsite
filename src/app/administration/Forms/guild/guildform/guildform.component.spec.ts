import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuildFormComponent } from './guildform.component';

describe('GuildFormComponent', () => {
  let component: GuildFormComponent;
  let fixture: ComponentFixture<GuildFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
