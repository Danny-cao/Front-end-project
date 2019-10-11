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
        
    }
    
    //uses the user's email to find the matching reservations.
    getReservations(email: string) {
        return this.reservations = this.afs.collection('Reservations', ref => ref.where('emailStudent', '==', email)).valueChanges();
    }

}