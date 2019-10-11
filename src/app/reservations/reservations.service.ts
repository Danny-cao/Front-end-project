import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Reservation } from './reservationModel/Reservation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations: Observable<Reservation[]>;
  reservationsAccepted: Observable<Reservation[]>;
  reservationsCancel: Observable<Reservation[]>;
  reservationDoc: AngularFirestoreDocument<Reservation>;
  reservationsRejected: Observable<Reservation[]>;


  // Save all data in the lists
  constructor(public afs: AngularFirestore) {
    this.reservationsCollection = afs.collection<Reservation>('Reservations', ref => ref);
    this.reservations = this.reservationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reservation;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.reservationsAccepted = this.afs.collection('Reservations', ref => ref.where('status', '==', 'Accepted')).valueChanges();
    this.reservationsRejected = this.afs.collection('Reservations', ref => ref.where('status', '==', 'Rejected')).valueChanges();
  }


  // get a list with all reservations
  getReservations() {
    return this.reservations;
  }

  // get a list with all accepted reservations
  getReservationsAccepted() {
    return this.reservationsAccepted;
  }

  // get a list with all rejected reservations
  getReservationsRejected() {
    return this.reservationsRejected;
  }

  // change status to Geannuleerd by reservation with that id
  cancelReservation(reservation: Reservation) {
    this.reservationDoc = this.afs.doc(`Reservations/${reservation.id}`);
    this.reservationDoc.update({
      status: 'Geannuleerd'
    });
  }
}

