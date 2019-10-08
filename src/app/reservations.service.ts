import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './user/reservations/reservation';

@Injectable({
    providedIn: 'root'
})

export class ReservationsService {

    reservationsCollection: AngularFirestoreCollection<Reservation>;

    reservations: Observable<Reservation[]>;
    reservationStatus: Observable<Reservation[]>;
    reservationBeoordeeld: Observable<Reservation>;

    constructor(public afs: AngularFirestore){
        this.reservations = this.afs.collection('Reservations').valueChanges();
    }
    
    getReservations() {
        return this.reservations;
    }

    getReservationQR() {
        //haal qr uit db
        return this.reservationStatus = this.afs.collection('Reservations', ref => ref.where('status', '==', 'Rejected')).valueChanges();
    }

}