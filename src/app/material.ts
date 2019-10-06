import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material'; 
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';





@NgModule({
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,MatNativeDateModule,MatButtonModule,MatRadioModule,MatExpansionModule],
  exports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,MatNativeDateModule,MatButtonModule,MatRadioModule,MatExpansionModule],
})
export class MaterialModule {
   
  

 }