import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Reservation } from './reservationModel/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationsReviewed: Observable<Reservation[]>;
  reservationsCancel: Observable<Reservation[]>;

  constructor(public afs: AngularFirestore) {
    this.reservations = this.afs.collection('Reservations').valueChanges();
    this.reservationsReviewed = this.afs.collection('Reservations', ref => ref.where('beoordeeld', '==', true)).valueChanges();
  }

  getReservations() {
    return this.reservations;
  }

  getReservationsReviewed() {
    return this.reservationsReviewed;
  }

  cancelReservation(id: string) {
    this.afs.collection('Reservations').doc(id).update({
      status: 'geannuleerd'
    });
  }


}

