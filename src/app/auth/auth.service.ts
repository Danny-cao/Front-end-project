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

  // Get user state
  getUserState(){
    return this.afAuth.authState;
  }

  isLoggedIn(): boolean{
    return this.afAuth.authState !== null;
  }

  checkUserEnabled(email: string, password: string){

    // Als gebruikers status op "activated" staat dan login anders terug sturen naar homepagina.
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {

      // check undefined for users that prob. dont have account
      if(val == undefined){
        var error = JSON.parse('{"message": "Je hebt nog geen account"}');
        this.eventAuthError.next(error);
      }

      // if status is activated user has access
      if(val['status'] == 'activated'){
        this.login(email, password);
      }
      // disabled users can't login yet, have to be validated
      else if(val['status'] == 'disabled'){
        var error = JSON.parse('{"message": "Je account is door de beheerder nog niet geactiveerd"}');
        this.eventAuthError.next(error);
      }
      else{
        // declined users can't ever login
        var error = JSON.parse('{"message": "Je account is door de beheerder afgewezen."}');
        this.eventAuthError.next(error);
      }
    });
  }

  // login and send to home, otherwise catch the error
  login(email: string, password: string){

    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
      this.eventAuthError.next(error)
    }).then(userCredential => {
      if(userCredential){
        this.router.navigate(['/home']);
      }
    })    
  }

  // Create user with firstname and lastname. send user back to homepage.
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

  // insert User data, role to student and status to disabled to not allow login before admin activation
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

  // checkUserRole for menu. 
  checkUserRole(email){
    this.registration = this.db.collection("Users").doc(email).valueChanges();
    return this.registration;
  }

  // pages only accessible for admin (beheerder)
  accessOnlyAdmin(email){

    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'beheerder'){
        this.router.navigate(['home'])
      }
    });
  }

  // pages only accesible for user (Student)
  accessOnlyUser(email){
    this.db.collection("Users").doc(email).valueChanges().subscribe(val => {
      if(val['role'] != 'student'){
        this.router.navigate(['home'])
      }
    });
  }

  // Error message for registration
  basicErrorRegistration(){
    var error = JSON.parse('{"message": "Email moet eindigen met @hu.nl, voornaam en achternaam moet ingevuld worden"}');
    this.eventAuthError.next(error);
  }

}
