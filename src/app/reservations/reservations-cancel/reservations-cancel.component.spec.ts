import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsCancelComponent } from './reservations-cancel.component';

describe('ReservationsCancelComponent', () => {
  let component: ReservationsCancelComponent;
  let fixture: ComponentFixture<ReservationsCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
