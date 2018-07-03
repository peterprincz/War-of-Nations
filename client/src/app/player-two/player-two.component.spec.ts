import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTwoComponent } from './player-two.component';

describe('PlayerTwoComponent', () => {
  let component: PlayerTwoComponent;
  let fixture: ComponentFixture<PlayerTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
