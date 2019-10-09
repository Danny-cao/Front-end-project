import { Component, Input, EventEmitter, Output, OnInit, NgModule } from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material';
import {VerzoekService} from  './verzoek.service';
import {Verzoek} from './verzoek.model';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';




@Component({
  selector: 'verzoek',
  templateUrl: './verzoek.component.html',
  styleUrls: ['./verzoek.component.css'],
  
})


export class VerzoekComponent{ //oninit implementeren {
  
  user: firebase.User;

  minDate = new Date();


 @Output() 
 dateChange:EventEmitter<MatDatepickerInputEvent<any>>;
 
 
myFilter = (d: Date): boolean => {
  const day = d.getDay();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
}


private tijden:any[] = [
  {beginTijd: 8, eindTijd:10, name:'08:00 - 10:00',used:'false'},
  {beginTijd: 10, eindTijd:12, name:'10:00 - 12:00',used:'false'},
  {beginTijd: 12, eindTijd:14, name:'12:00 - 14:00',used:'false'},
  {beginTijd: 14, eindTijd:16, name:'14:00 - 16:00',used:'false'},
  {beginTijd: 16, eindTijd:18, name:'16:00 - 18:00',used:'false'},
  {beginTijd: 18, eindTijd:20, name:'18:00 - 20:00',used:'false'},

]


verzoeken:Verzoek[];
filterVerzoeken:Verzoek[];


constructor(private VerzoekService:VerzoekService, private auth: AuthService, private router: Router){}
ngOnInit() {
  this.auth.getUserState().subscribe( user => {
    this.user = user;
    if(user == null){
      this.router.navigate(['login']);
    }
    if(user != null){
      this.auth.accessOnlyUser(user.email);
    }
  });
}


someMethodName(date:any) { 
  this.VerzoekService.getVerzoeken(date.targetElement.value).subscribe(verzoeken =>{
    this.verzoeken = verzoeken;
    this.filterVerzoeken =  this.verzoeken.filter(function(verzoek) {
       return verzoek.Status == "Goedgekeurd";
    });   
    console.log(this.filterVerzoeken);
    this.tijden.forEach((el)=>{el.used = "false";})
    for(let verzoek of this.filterVerzoeken){
      for(let tijd of this.tijden){
        if(verzoek.BeginTijd == tijd.beginTijd && verzoek.EindTijd == tijd.eindTijd){
          tijd.used = 'true';
        }
        else if(tijd.used == "true"){
          tijd.used = "true";
      }
        else{
          tijd.used = 'false';
        }
      }
    
    }

  });


}


verzoek:Verzoek = new Verzoek();

createVerzoek(){
  this.VerzoekService.saveVerzoek(this.verzoek);
  this.verzoek = new Verzoek();

}










 

// maak uiteindelijk 1 functie

  

  
  

}