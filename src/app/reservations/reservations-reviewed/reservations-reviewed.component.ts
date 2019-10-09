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
  reservationsReviewed: Reservation[];
  user: firebase.User;


  constructor(private reservationsService: ReservationsService, private auth: AuthService, private router: Router) {}

  ngOnInit() {

    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user == null){
        this.router.navigate(['login']);
      }
      if(user != null){
        this.auth.accessOnlyAdmin(user.email);
      }
    });

    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

    this.reservationsService.getReservationsReviewed().subscribe(reservations => {
      this.reservationsReviewed = reservations;
    });

  }




}
