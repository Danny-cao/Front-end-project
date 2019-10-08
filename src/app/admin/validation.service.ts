import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Registration } from '../auth/registration/registrationModel/registration';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  registrationsCollection: AngularFirestoreCollection<Registration>;
  registrations: Observable<Registration[]>;

  constructor( private db: AngularFirestore, private router: Router, private auth: AuthService) { 
      this.registrations = this.db.collection('Users', ref => ref.where('status', '==', 'disabled')).valueChanges();
  }

  getRegisteredUsers(){
    return this.registrations;
  }

  acceptRegistration(email: string) {
    this.db.collection('Users').doc(email).update({
      status: 'activated'
    });
  }

  declineRegistration(email: string) {
    this.db.collection('Reservations').doc(email).update({
      status: 'declined'
    });
  }

}
