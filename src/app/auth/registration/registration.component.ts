import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  authError: any;
  
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    })
  }

  createUser(frm) {


    // email eindigen op @hu.nl
    // firstname en lastname moet ingevuld worden
    
    console.log(frm.value['email']);

    this.auth.createUser(frm.value);
  }
}
