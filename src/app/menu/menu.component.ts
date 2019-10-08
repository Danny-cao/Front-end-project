import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Registration } from '../auth/registration/registrationModel/registration';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  registration: Registration;

  user: firebase.User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      console.log(user);
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
    this.router.navigate(['/home'])
  }

  register(){
    this.router.navigate(['/register']);
  }

}
