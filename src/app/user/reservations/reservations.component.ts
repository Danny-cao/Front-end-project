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

  resID: string;
  resStatus: string;

  reservations: Reservation[];
  reservationsBeoordeeld: Reservation;

  constructor(private reservationsService: ReservationsService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  openDialog(el): void {
    this.resID = el.getAttribute('data-id');

    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: { resID: this.resID }
    });
  }
   
}
