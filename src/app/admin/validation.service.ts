import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(    
    private db: AngularFirestore,
    private router: Router) { }


getRegisteredUsers(){
  this.db.collection("Users").valueChanges().subscribe(val => console.log(val));
}

}
