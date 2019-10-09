import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ValidationComponent } from './admin/validation/validation.component';
import { VerzoekComponent } from './verzoek/verzoek.component';
import { BeoordelingComponent } from './beoordeling/beoordeling.component';
import { ReservationsCancelComponent } from './reservations/reservations-cancel/reservations-cancel.component';
import { ReservationsReviewedComponent } from './reservations/reservations-reviewed/reservations-reviewed.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'validation',
    component: ValidationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verzoek',
    component: VerzoekComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beoordeling',
    component: BeoordelingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservationCancel',
    component: ReservationsCancelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservationReview',
    component: ReservationsReviewedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
