import { Component, OnInit } from '@angular/core';
import {BeoordelingService} from './beoordeling.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Request } from '../verzoek/verzoek.model';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-beoordeling',
  templateUrl: './beoordeling.component.html',
  styleUrls: ['./beoordeling.component.css']
})
export class BeoordelingComponent implements OnInit {

  requests:Request[];
  filterVerzoeken:Request[];
  editState: boolean = false;

  user: firebase.User;
 

 
  constructor(private beoordelingService:BeoordelingService, private auth: AuthService, private router: Router, private toastr:ToastrService) { }
 
 
  RejectEdit:Request;

 // get requests with status = inbehandeling
  ngOnInit() {

    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user == null){
        this.router.navigate(['login']);
      }
      if(user != null){
        this.auth.accessOnlyAdmin(user.email);
      }
    });

     this.beoordelingService.getRequests().subscribe(verzoeken =>{
      this.requests = verzoeken;
      this.filterVerzoeken =  this.requests.filter(function(verzoek) {
        return verzoek.status == "Inbehandeling";
      });   
    });
  }

  Accept(request){
    this.beoordelingService.acceptRequest(request);
    this.toastr.success('succesvol status geupdate naar Accepted!');
  }

  Reject($event,request){
    this.beoordelingService.rejectRequest(request);
    this.toastr.success('succesvol status geupdate naar Rejected!');
  }

  openCommensection($event,request){
    this.editState = true;
    this.RejectEdit = request;

  }


  

}

 


 
