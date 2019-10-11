import { Component, OnInit, EventEmitter, Output} from '@angular/core'
import { MatDatepickerInputEvent } from '@angular/material';
import {VerzoekService} from  './verzoek.service';
import {Request} from './verzoek.model';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'verzoek',
  templateUrl: './verzoek.component.html',
  styleUrls: ['./verzoek.component.css'],
  
})




export class VerzoekComponent implements OnInit{ 

user: firebase.User;
  
// Calendar starts from currentDate
minDate = new Date();

//The (dateChange) event will fire whenever the user  chooses a date from the calendar.
@Output() 
dateChange:EventEmitter<MatDatepickerInputEvent<any>>;
 
// Prevent Saturday and Sunday from being selected in the calendar.
myFilter = (d: Date): boolean => {
  const day = d.getDay();
  return day !== 0 && day !== 6;
}

requests:Request[];
filterRequests:Request[];


constructor(private VerzoekService:VerzoekService,private auth: AuthService,private toastr:ToastrService){}

ngOnInit() {
  this.auth.getUserState().subscribe( user => {
    this.user = user;
  })
}


 // get available times on a selected date
  getAvailableTimes(date:any) {
      this.VerzoekService.getRequests(date.targetElement.value).subscribe(requests =>{
      this.requests = requests;
      this.filterRequests =  this.requests.filter(function(request) {
         return request.status == "Accepted" || request.status == "Inbehandeling";
      });   
      console.log(this.filterRequests);
      this.VerzoekService.Blocktimes.forEach((el)=>{el.used = "false";})
      for(let request of this.filterRequests){
        for(let time of this.VerzoekService.Blocktimes){
          if(request.startTime == time.startTime && request.endTime == time.endTime){
            time.used = 'true';
          }
    
          else if(time.used == "true"){
            time.used = "true";
        }
          else{
            time.used = 'false';
          }
        }
      
      }
  
    });


}


// save request
request:Request = new Request();
createRequest(){
  console.log(this.request.date);
  if(this.request.description == null || this.request.date == null|| this.request.startTime == null){
    this.toastr.error('Vul alle velden correct in!');
  }
  else{
  this.VerzoekService.saveRequest(this.request,this.user.email);
  this.toastr.success('Uw verzoek is in behandeling genomen!');
 
 


  }

  }

  
  
}



