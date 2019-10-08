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

    constructor(public afs: AngularFirestore){
        
    }
    
    checkQRCode(qrcode: string) {
        //db code voor check qr
        return this.qrvalid;
    }

}