import { Component, ViewChild } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { ScannenService } from '../scannen.service';
import { Reservation } from '../user/reservations/reservation';

@Component({
  selector: 'app-scannen',
  templateUrl: './scannen.component.html',
  styleUrls: ['./scannen.component.css']
})

export class ScannenComponent {

    constructor(private scannenService: ScannenService) {

    }

    @ViewChild('scanner', {static: false})
    scanner: ZXingScannerComponent;

    qrcodeText: string;
    qrcodeValid: string = 'default';
    reservations: Reservation[];

    curDate: string = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    curTime: string = formatDate(new Date(), 'H:mm', 'en');

    curDatetime;
    resDatetimeStart;
    resDatetimeEnd;

    scanSuccessHandler($event): void {

        this.qrcodeText = $event;

        this.scannenService.checkQRCode(this.qrcodeText).subscribe(reservations => {
            
            this.reservations = reservations;
            console.log(reservations);
            if (this.reservations[0] != null) {

              if (this.reservations[0].date == this.curDate) {
                
                // date parse gaat fout
                this.resDatetimeStart = Date.parse(this.curDate + " " + this.reservations[0].startTime);
              
                this.resDatetimeEnd = Date.parse(this.curDate + " " + this.reservations[0].endTime);

                this.curDatetime = Date.parse(this.curDate + " " + this.curTime);

                if ((this.resDatetimeStart - 5000) <= this.curDatetime && this.resDatetimeEnd >= this.curDatetime) {

                  this.qrcodeValid = "true";
                  
                } else {

                  this.qrcodeValid = "false";

                }

              } else {

                this.qrcodeValid = "false";

              }

            } else {

              this.qrcodeValid = "false";

            }

        });

        setTimeout(() => {

          this.qrcodeValid = "default";
          
        }, 5000);

    }

}
