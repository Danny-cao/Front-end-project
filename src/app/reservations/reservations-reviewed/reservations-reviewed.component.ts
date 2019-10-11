import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Reservation } from '../reservationModel/Reservation';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reservations-reviewed',
  templateUrl: './reservations-reviewed.component.html',
  styleUrls: ['./reservations-reviewed.component.css']
})
export class ReservationsReviewedComponent implements OnInit {
  reservations: Reservation[];
  reservationsAccepted: Reservation[];
  reservationsRejected: Reservation[];
  user: firebase.User;

  constructor(private reservationsService: ReservationsService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // save user and check if user is null is it is null then navigate it to the login page
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['login']);
      }
      if (user != null) {
        this.auth.accessOnlyAdmin(user.email);
      }
    });

    // get all reservations
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

    // get all accepted reservations
    this.reservationsService.getReservationsAccepted().subscribe(reservations => {
      this.reservationsAccepted = reservations;
    });

    // get all rejected reservations
    this.reservationsService.getReservationsRejected().subscribe(reservations => {
      this.reservationsRejected = reservations;
    });

  }




}
