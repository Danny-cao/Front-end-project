import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Verzoek } from '../verzoek/verzoek.model';


@Injectable({
  providedIn: 'root'
})


export class VerzoekService {

  openstaandeTijden:AngularFirestoreCollection<Verzoek>;
  verzoeken:Observable<Verzoek[]>;


  
  constructor(public afs:AngularFirestore) {}


  getVerzoeken(datum:String){
    this.openstaandeTijden = this.afs.collection<Verzoek>('Reservations', ref => ref.where('Datum','==',datum));
    this.verzoeken = this.openstaandeTijden.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Verzoek;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ); 
    return this.verzoeken;
  }

  
  format(date:any):String{
    var formatted_date = date.getDate() + "-" + 
    (date.getMonth()+1) + "-" + date.getFullYear();
    formatted_date = formatted_date.toString();
    return formatted_date;

  }


 

 saveVerzoek(verzoek:Verzoek){
  this.openstaandeTijden.add({
    Status:'Inbehandeling',
    BeginTijd:verzoek.BeginTijd,
    EindTijd:verzoek.BeginTijd +2,
    Motivatie:verzoek.Motivatie,
    Datum:this.format(verzoek.Datum)
  })

 }
 




  }

  



 


  

 
