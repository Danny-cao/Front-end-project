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
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user == null){
        this.router.navigate(['login']);
      }
      if(user != null){
        this.auth.accessOnlyUser(user.email);
      }
    });

    this.reservationsService.reservations.subscribe(reservations => {
      this.reservations = reservations;
      this.getMijnReservations();
    });
  }

  cancelReservation(id: string, status: string) {
    console.log(id, status);
    if (status !== 'Geannuleerd') {
      this.reservationsService.cancelReservation(id);
      this.bericht = 'Reservering Geannuleerd';

    //   function delay(ms: number) {
    //     return new Promise( resolve => setTimeout(resolve, ms) );
    //   }

    //   (async () => {
    //     await delay(1000);

    //     this.getMijnReservations();
    // })();

    this.getMijnReservations();
    } else {
      this.bericht = 'Reservering was al geannuleerd';
    }

  }



  getMijnReservations() {

    for (const reservation of this.reservations) {
      if (this.mijnReservations.length > 0) {
        this.mijnReservations = [];
      }
      
      
      if (reservation.emailStudent === this.user.email) {
        return this.mijnReservations.push(reservation);
      }
    }
  }



}
