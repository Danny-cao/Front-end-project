import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './user/reservations/reservation';

@Injectable({
    providedIn: 'root'
})

export class ScannenService {

    reservationsCollection: AngularFirestoreCollection<Reservation>;

    qrvalid: Boolean = true;
    qrFromDB: Observable<Reservation[]>;

    constructor(public afs: AngularFirestore){
        
    }
    
    checkQRCode(qrcode: string) {
        return this.qrFromDB = this.afs.collection('Reservations', ref => ref.where('qrcode', '==', qrcode)).valueChanges();
    }

}