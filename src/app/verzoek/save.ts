/*

private beginTijden:any[] = [
    {value:9,name:'09:00',used:'false'},
    {value:10,name:'10:00',used:'false'},
    {value:11,name:'11:00',used:'false'},
    {value:12,name:'12:00',used:'false'},
    {value:13,name:'13:00',used:'false'},
    {value:14,name:'14:00',used:'false'},
    {value:15,name:'15:00',used:'false'},
    {value:16,name:'16:00',used:'false'},
    {value:17,name:'17:00',used:'false'},
    {value:18,name:'18:00',used:'false'},
    {value:19,name:'19:00',used:'false'}
  ]
  
  private eindTijden:any[] = [
    {value:10,name:'10:00',used:'false'},
    {value:11,name:'11:00',used:'false'},
    {value:12,name:'12:00',used:'false'},
    {value:13,name:'13:00',used:'false'},
    {value:14,name:'14:00',used:'false'},
    {value:15,name:'15:00',used:'false'},
    {value:16,name:'16:00',used:'false'},
    {value:17,name:'17:00',used:'false'},
    {value:18,name:'18:00',used:'false'},
    {value:19,name:'19:00',used:'false'},
    {value:20,name:'20:00',used:'false'},
  ]
  
  verzoeken:Verzoek[];
  filterVerzoeken:Verzoek[];
  beginTijd:number;
  value:string;
  
  constructor(private Service:VerzoekService){}
  
  someMethodName(date: any) {  
    this.Service.getVerzoeken(date.targetElement.value).subscribe(ref=>{
      this.verzoeken = ref;
      this.value = date.targetElement.value;
      this.filterVerzoeken =  this.verzoeken.filter(function(verzoek) {
        return verzoek.status == "Goedgekeurd";
      });
  
      console.log(this.filterVerzoeken);
  
  
    for(let verzoek of this.filterVerzoeken){
      console.log(verzoek);
      this.beginTijd = verzoek.beginTijd;
      if(this.beginTijd == 9){
        this.beginTijd = 10;
      }
      for(let eindTijd of this.eindTijden){
        if(this.beginTijd == eindTijd.value && this.beginTijd <= verzoek.eindTijd){
             eindTijd.used = 'true'; 
             this.beginTijd+=1;   
          }
        else if(eindTijd.used == "true"){
              eindTijd.used = "true";
          }
        else{
              eindTijd.used = 'false';
          } 
      }
    }
    
  console.log(this.eindTijden);

  for(let verzoek of this.filterVerzoeken){
    console.log(verzoek);
    this.beginTijd = verzoek.beginTijd;
    for(let begin of this.beginTijden){
      if(this.beginTijd == begin.value && this.beginTijd <= verzoek.eindTijd){
           begin.used = 'true'; 
           this.beginTijd+=1;   
        }
      else if(begin.used == "true"){
            begin.used = "true";
        }
      else{
            begin.used = 'false';
        } 
    }
  }
  });
  console.log(this.beginTijden);
      
  }
  
  verzoek:Verzoek = new Verzoek();
  
  createVerzoek(){
    console.log(this.value);
    this.Service.saveVerzoek(this.verzoek);
    this.verzoek = new Verzoek();
  }
  
  }
   
  
  // maak uiteindelijk 1 functie
  
    <mat-form-field >
        <mat-label>Begin tijd</mat-label>
        <mat-select [(ngModel)]="verzoek.beginTijd"> 
          <mat-option *ngFor="let tijd of beginTijden" [value]="tijd.value" [disabled]=tijd.used>{{tijd.name}}</mat-option>
        </mat-select>
      </mat-form-field>
      
      <!--<p>You selected1: {{selected}}</p>-->
      <mat-form-field >
            <mat-label>Eind tijd</mat-label>
            <mat-select [(ngModel)]="verzoek.eindTijd">
              <mat-option *ngFor="let tijd of eindTijden" [value] = "tijd.value" [disabled]=tijd.used>{{tijd.name}}</mat-option>
           
            </mat-select>
          </mat-form-field>

          <mat-form-field class="example-full-width" class="fixed-calendar">
    <input [(ngModel)]="verzoek.datum" matInput [matDatepickerFilter]="myFilter"  [min]="minDate" [max]="maxDate" [matDatepicker]="picker" placeholder="Kies een datum"
    (dateChange)="someMethodName($event)">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker touchUi #picker></mat-datepicker>
</mat-form-field>

<mat-form-field class="example-full-width">
  <textarea matInput placeholder="Leave a comment" [(ngModel)]="verzoek.motivatie"></textarea>
</mat-form-field>
<div class="example-button-row">
  <button (click) = 'createVerzoek()' mat-raised-button>Basic</button>
  </div>
  */
    
    
  