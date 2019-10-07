import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ValidationComponent } from './admin/validation/validation.component';
import { VerzoekComponent } from './verzoek/verzoek.component';
import { BeoordelingComponent } from './beoordeling/beoordeling.component';


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
    component: ValidationComponent
  },
  {
    path: 'verzoek',
    component: VerzoekComponent
  },
  {
    path: 'beoordeling',
    component: BeoordelingComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
