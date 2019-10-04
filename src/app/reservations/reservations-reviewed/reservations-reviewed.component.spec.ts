import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsReviewedComponent } from './reservations-reviewed.component';

describe('ReservationsReviewedComponent', () => {
  let component: ReservationsReviewedComponent;
  let fixture: ComponentFixture<ReservationsReviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsReviewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
