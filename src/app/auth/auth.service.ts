import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { auth } from 'firebase';
import { Registration } from './registration/registrationModel/registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  registration : Observable<Registration>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState(){
    return this.afAuth.authState;
  }

  isLoggedIn(): boolean{
    return this.afAuth.authState !== null;
  }

  checkUserEnabled(email: string, password: string){

    // Als gebruikers status op "true" staat dan login anders terug sturen naar homepagina.

    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {

      if(val == undefined){
        var error = JSON.parse('{"message": "Je hebt nog geen account"}');
        this.eventAuthError.next(error);
      }

      console.log(val['status']);
      if(val['status'] == 'activated'){
        this.login(email, password);
      }
      else if(val['status'] == 'disabled'){
        var error = JSON.parse('{"message": "Je account is door de beheerder nog niet geactiveerd"}');
        this.eventAuthError.next(error);
      }
      else{
        var error = JSON.parse('{"message": "Je account is door de beheerder afgewezen."}');
        this.eventAuthError.next(error);
      }
    });
  }

  login(email: string, password: string){

    // controleer eerst of gebruiker is bevestigd door beheerder.
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
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
      userCredential.user.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      });

      this.insertUserData(userCredential).then(() => {
        this.logout();
        this.router.navigate(['/home']);
      });
    }).catch( error => {
      this.eventAuthError.next(error);
    })


  }

  insertUserData(userCredential: firebase.auth.UserCredential){
    return this.db.doc(`Users/${this.newUser.email}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'student',
      status: 'disabled'
    })
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  checkUserRole(email){
    this.registration = this.db.collection("Users").doc(email).valueChanges();
    return this.registration;
  }

  // change role naming later.
  accessOnlyAdmin(email){

    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'beheerder'){
        this.router.navigate(['home'])
      }
    });
  }

  // change role naming later.
  accessOnlyUser(email){
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'student'){
        this.router.navigate(['home'])
      }
    });
  }

}
