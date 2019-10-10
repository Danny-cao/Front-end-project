import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { VerzoekComponent } from './verzoek/verzoek.component';
import { MenuComponent } from './menu/menu.component';

// authentication
import { AuthGuard } from './core/auth.guard';

import { ReservationsComponent } from './user/reservations/reservations.component';
import { ReservationsService } from './reservations.service';

import { AngularMaterialModule } from './angular-material.module';
import { MyModalComponent } from './user/reservations/my-modal/my-modal.component';

import { ScannenComponent } from './qrscan/scannen.component';
import { ScannenService } from './scannen.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';

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
    ReservationsCancelComponent,
    MenuComponent,
    ReservationsComponent,
    MyModalComponent,
    ScannenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularMaterialModule,
    ZXingScannerModule,
    QRCodeModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},VerzoekService, AuthGuard, ReservationsService, ScannenService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MyModalComponent]
})
export class AppModule { }