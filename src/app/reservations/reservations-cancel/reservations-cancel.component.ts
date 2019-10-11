import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Reservation } from '../reservationModel/Reservation';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations-cancel',
  templateUrl: './reservations-cancel.component.html',
  styleUrls: ['./reservations-cancel.component.css']
})
export class ReservationsCancelComponent implements OnInit {
  reservations: Reservation[];
  user: firebase.User;
  mijnReservations: Reservation[] = [];
  bericht: string;

  constructor(private reservationsService: ReservationsService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // save user and check if user is null is it is null then navigate it to the login page
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyUser(user.email);
      }
    });

    // get all reservations and run get mijn reservations to get the reservations of the user
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      this.getMijnReservations();
    });

  }

  // method to set status of reservation to Geannuleerd
  cancelReservation(reservation: Reservation, status: string) {
    if (status !== 'Geannuleerd') {
      this.reservationsService.cancelReservation(reservation);
      this.bericht = 'Reservering Geannuleerd';
    } else {
      this.bericht = 'Reservering was al geannuleerd';
    }

  }

  // get the reservations of the person who is loggen in
  getMijnReservations() {
    while (this.mijnReservations.length > 0) {
    this.mijnReservations.pop();
    }
    for (const reservation of this.reservations) {
      if (reservation.emailStudent === this.user.email) {
        this.mijnReservations.push(reservation);
      }
    }
  }



}
