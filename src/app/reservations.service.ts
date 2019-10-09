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

    constructor(public afs: AngularFirestore){
        this.reservations = this.afs.collection('Reservations', ref => ref.orderBy('date')).valueChanges();
    }
    
    getReservations() {
        return this.reservations;
    }

}