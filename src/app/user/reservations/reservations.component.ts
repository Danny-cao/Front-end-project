import { Component, OnInit } from '@angular/core';

import { Reservation } from './reservation';
import { ReservationsService } from '../../reservations.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyModalComponent } from './my-modal/my-modal.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {

  resStatus: string;
  resStatusBool: Boolean;
  resComment: string;
  reservations: Reservation[];
  reservationStatus: Reservation[];

  constructor(private reservationsService: ReservationsService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      //console.log(this.reservations);
    });

    this.reservationsService.getReservationQR().subscribe(result => {
      this.reservationStatus = result;
      //console.log(this.reservationStatus);
    });

  }

  openDialog(el): void {
    this.resStatus = el.getAttribute('status');
    this.resComment = el.getAttribute('comment');

    if (this.resStatus == "Accepted") {
        this.resStatusBool = true;
    }

    if (this.resStatus == "Rejected") {
        this.resStatusBool = false;
    }

    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '500px',
      data: { resStatus: this.resStatusBool, resComment: this.resComment }
    });
  }
   
}
