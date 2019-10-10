import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Reservation } from './reservationModel/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationsAccepted: Observable<Reservation[]>;
  reservationsCancel: Observable<Reservation[]>;
  reservationsRejected: Observable<Reservation[]>;

  constructor(public afs: AngularFirestore) {
    this.reservations = this.afs.collection('Reservations').valueChanges();
    this.reservationsAccepted = this.afs.collection('Reservations', ref => ref.where('status', '==', 'Accepted' )).valueChanges();
    this.reservationsRejected = this.afs.collection('Reservations', ref => ref.where('status', '==', 'Rejected' )).valueChanges();
  }

  getReservations() {
    return this.reservations;
  }

  getReservationsAccepted() {
    return this.reservationsAccepted;
  }

  getReservationsRejected() {
    return this.reservationsRejected;
  }

  cancelReservation(id: string) {
    
    this.afs.collection('Reservations').doc(id).update({
      status: 'Geannuleerd'
    });
  }
}

