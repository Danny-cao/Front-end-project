import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Registration } from '../auth/registration/registrationModel/registration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registration: Registration;

  user: firebase.User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;

      if(user != null){
        this.getUserRole(user.email);
      }
    })
  }

  getUserRole(email){
    this.auth.checkUserRole(email).subscribe(registration => this.registration = registration);
  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
    this.auth.logout();
  }

  register(){
    this.router.navigate(['/register'])
  }
}
