import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from '../verzoek/verzoek.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class VerzoekService {

  requests_:AngularFirestoreCollection<Request>;
  requests:Observable<Request[]>;

  // block times where students can choose from
  Blocktimes:any = [
    {startTime: 0,endTime:5, name:'08:00 - 10:00',used:'false'},
    {startTime: 10,endTime:12,name:'10:00 - 12:00',used:'false'},
    {startTime: 12,endTime:14,name:'12:00 - 14:00',used:'false'},
    {startTime: 14,endTime:16,name:'14:00 - 16:00',used:'false'},
    {startTime: 16,endTime:18,name:'16:00 - 18:00',used:'false'},
    {startTime: 18,endTime:20,name:'18:00 - 20:00',used:'false'}, 
  ]


  constructor(private afs:AngularFirestore, private router:Router) {}

  // retrieves all requests from the selected date
  getRequests(date:String){
    this.requests_ = this.afs.collection<Request>('Reservations', ref => ref.where('date','==',date));
    this.requests = this.requests_.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ); 
    return this.requests;
  }

  // formats the chosen date to a string date
  format(date:any):String{
    var formatted_date = date.getDate() + "-" + 
    (date.getMonth()+1) + "-" + date.getFullYear();
    formatted_date = formatted_date.toString();
    
    return formatted_date;

  }
 
 // save request made by student
 saveRequest(request:Request,user:string){
   console.log(request);
  this.requests_.add({
    status:'Inbehandeling',
    startTime:request.startTime,
    endTime:request.startTime +2,
    description:request.description,
    date:this.format(request.date),
    requestDate:new Date().toDateString(),
    emailStudent:user

}).then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
this.router.navigate(['/home']);


}


}

 



  



 


  

 
