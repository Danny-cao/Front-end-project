import { Component, OnInit } from '@angular/core';

import { Reservation } from './reservation';
import { ReservationsService } from '../../reservations.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyModalComponent } from './my-modal/my-modal.component';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {

  resStatus: string;
  resStatusBool: boolean = false;
  resComment: string;
  resQR: string;
  reservations: Reservation[];
  reservationStatus: Reservation[];

  user: firebase.User;

  constructor(private reservationsService: ReservationsService, public dialog: MatDialog, private auth: AuthService,) {

  }

  ngOnInit(){

    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user != null){
        this.reservationsService.getReservations(user.email).subscribe(reservations => {
          this.reservations = reservations;
        });

      }

    })

  }

  openDialog(el): void {
    this.resStatus = el.getAttribute('status');
    this.resComment = el.getAttribute('comment');
    this.resQR = el.getAttribute('qrcode');

    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '500px',
      data: { resStatus: this.resStatus, resComment: this.resComment, resQR: this.resQR }
    });
  }
   
}
