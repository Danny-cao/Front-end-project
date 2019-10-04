import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Reservation } from '../reservationModel/Reservation';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reservations-cancel',
  templateUrl: './reservations-cancel.component.html',
  styleUrls: ['./reservations-cancel.component.css']
})
export class ReservationsCancelComponent implements OnInit {
  reservations: Reservation[];
  user: firebase.User;
  mijnReservations: Reservation[];

  constructor(private reservationsService: ReservationsService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      console.log(this.user.email);
    });

    this.reservationsService.reservations.subscribe(reservations => {
      this.reservations = reservations;
    });

  }

  cancelReservation(id: string) {
    this.reservationsService.cancelReservation(id);
  }



}
