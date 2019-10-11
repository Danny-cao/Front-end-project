import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from '../verzoek/verzoek.model';
import {VerzoekService} from '../verzoek/verzoek.service';


@Injectable({
  providedIn: 'root'
})

export class BeoordelingService {

  status_Inbehandeling:AngularFirestoreCollection<Request>;
  Requests:Observable<Request[]>;
  requestDoc:AngularFirestoreDocument<Request>;

  currentdate = new Date();
  
  
  


  constructor(private afs:AngularFirestore,private verzoekService:VerzoekService){
   
    
    this.status_Inbehandeling =
     afs.collection<Request>('Reservations', ref => ref.where('date', '>=',this.verzoekService.format(this.currentdate)));
    this.Requests = this.status_Inbehandeling.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
      
        return {id, ...data}
      }))
    );
  }

  
  
  // get requests
  getRequests(){
    return this.Requests;
  }



  // request gets the status accepted
  acceptRequest(request:Request){
    this.requestDoc = this.afs.doc(`Reservations/${request.id}`);
    this.requestDoc.update({
      status: 'Accepted'
    })

  }

  // request is not accepted and request gets the status rejected
  rejectRequest(request:Request){
    this.requestDoc = this.afs.doc(`Reservations/${request.id}`);
    this.requestDoc.update({
      status: 'Rejected',
      teacherComment: request.teacherComment
      
    })
  }





}

