import { Component, OnInit } from '@angular/core';
import {BeoordelingService} from './beoordeling.service';
import { Verzoek } from '../verzoek/verzoek.model';
import {MatExpansionModule} from '@angular/material/expansion';



@Component({
  selector: 'app-beoordeling',
  templateUrl: './beoordeling.component.html',
  styleUrls: ['./beoordeling.component.css']
})
export class BeoordelingComponent implements OnInit {

  verzoeken:Verzoek[];
  filterVerzoeken:Verzoek[];
  editState: boolean = false;
  AfkeurEdit:Verzoek;
 

 
  constructor(private beoordelingService:BeoordelingService) { }
 
 

  ngOnInit() {

    this.beoordelingService.getVerzoeken().subscribe(verzoeken =>{
      this.verzoeken = verzoeken;
      this.filterVerzoeken =  this.verzoeken.filter(function(verzoek) {
     
        return verzoek.Status == "Inbehandeling";
      });   

    });
   
    

  }



 

  Goedkeuren(verzoek){
    this.beoordelingService.Goedkeuren(verzoek);
  }

  updateAfkeuren($event,verzoek){
    this.beoordelingService.UpdateA(verzoek);
  }

  Afkeuren($event,verzoek){
    this.editState = true;
    this.AfkeurEdit = verzoek;

  }

  close(){
    this.editState = false;
  }
  

}

 
