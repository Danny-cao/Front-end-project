import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Reservation } from '../reservationModel/Reservation';

@Component({
  selector: 'app-reservations-reviewed',
  templateUrl: './reservations-reviewed.component.html',
  styleUrls: ['./reservations-reviewed.component.css']
})
export class ReservationsReviewedComponent implements OnInit {
  reservations: Reservation[];
  reservationsReviewed: Reservation[];


  constructor(private reservationsService: ReservationsService) {
   }

  ngOnInit() {
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

    this.reservationsService.getReservationsReviewed().subscribe(reservations => {
      this.reservationsReviewed = reservations;
    });

  }




}
