import { Component, OnInit } from '@angular/core';
import {BeoordelingService} from './beoordeling.service';
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
  RejectEdit:Request;
 

 
  constructor(private beoordelingService:BeoordelingService,private toastr:ToastrService) { }


 // get requests with status = inbehandeling
  ngOnInit() {
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

 


 
