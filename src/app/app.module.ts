import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// imports voor firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ValidationComponent } from './admin/validation/validation.component';
import { ReservationsReviewedComponent } from './reservations/reservations-reviewed/reservations-reviewed.component';
import { ReservationsCancelComponent } from './reservations/reservations-cancel/reservations-cancel.component';
import { VerzoekService } from './verzoek/verzoek.service';
import { BeoordelingComponent } from './beoordeling/beoordeling.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { VerzoekComponent } from './verzoek/verzoek.component';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ValidationComponent,
    VerzoekComponent,
    BeoordelingComponent,
    ReservationsReviewedComponent,
    ReservationsCancelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
     BrowserModule,
     BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},VerzoekService],
  bootstrap: [AppComponent]
})
export class AppModule { }
