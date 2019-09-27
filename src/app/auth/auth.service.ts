import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router) { }

  getUserState(){
    return this.afAuth.authState;
  }    

  checkUserEnabled(email: string, password: string){

    // Als gebruikers status op "true" staat dan login anders terug sturen naar homepagina.
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      console.log(val['status']);
      if(val['status'] == true){
        this.login(email, password);
      }
      else {
        this.router.navigate(['/home'])
      }
    });
  }

  login(email: string, password: string){

    // controleer eerst of gebruiker is bevestigd door beheerder.
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      this.eventAuthError.next(error)
    }).then(userCredential => {
      if(userCredential){
        this.router.navigate(['/home']);
      }
    })    
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then( userCredential =>{
      this.newUser = user;
      //console.log(userCredential);
      userCredential.user.updateProfile({
        displayName: user.firstName + '' + user.lastName
      });

      this.insertUserData(userCredential).then(() => {
        this.router.navigate(['/home']);
      });
    }).catch( error => {
      this.eventAuthError.next(error);
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential){
    return this.db.doc(`Users/${this.newUser.email}`).set({
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'student',
      status: 'disabled'
    })
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
}
