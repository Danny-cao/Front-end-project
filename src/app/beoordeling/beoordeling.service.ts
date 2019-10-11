import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Verzoek } from '../verzoek/verzoek.model';


@Injectable({
  providedIn: 'root'
})

export class BeoordelingService {

  Inbehandeling: AngularFirestoreCollection<Verzoek>;
  verzoeken: Observable<Verzoek[]>;
  verzoekDoc: AngularFirestoreDocument<Verzoek>;


  constructor(public afs: AngularFirestore) {
    this.Inbehandeling = afs.collection<Verzoek>('Reservations', ref => ref.orderBy('Datum','desc'));
    this.verzoeken = this.Inbehandeling.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Verzoek;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getVerzoeken(){
    return this.verzoeken;
  }

  Goedkeuren(verzoek:Verzoek){
    this.verzoekDoc = this.afs.doc(`Reservations/${verzoek.id}`);
    this.verzoekDoc.update({
      Status: 'Goedgekeurd'
    })

  }

  UpdateA(verzoek:Verzoek){
    this.verzoekDoc = this.afs.doc(`Reservations/${verzoek.id}`);
    this.verzoekDoc.update({
      Status: 'Afgekeurd',
      comment: verzoek.comment
    })
  }



}
