import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(private validation: ValidationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.validation.getRegisteredUsers();
  }

}
