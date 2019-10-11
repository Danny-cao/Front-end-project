import { Component, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

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

    //variable used in the styling of the component to decide when to change the background-color.
    qrcodeValid: string = 'default';
    reservations: Reservation[];

    //format the current date and time to a string to use for the resevation data checking.
    curDate: string = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    curTime: string = formatDate(new Date(), 'H:mm', 'en');

    curDatetime;
    resDatetimeStart;
    resDatetimeEnd;

    scanSuccessHandler($event): void {

      //variable for the qrcode value scanned.
        this.qrcodeText = $event;

        //use the found qrcode from the scanner to find the reservation.
        this.scannenService.checkQRCode(this.qrcodeText).subscribe(reservations => {
            
            this.reservations = reservations;
            
            //check if the reservation is found or not.
            if (this.reservations[0] != null) {

              //check if the reservation date matches the current date.
              if (this.reservations[0].date == this.curDate) {
                
                //parses the reservation starttime && endtime for usage in the reservation time check.
                this.resDatetimeStart = Date.parse(this.curDate + "T" + this.reservations[0].startTime + ":00");
                this.resDatetimeEnd = Date.parse(this.curDate + "T" + this.reservations[0].endTime + ":00");

                //parses the currentdate + currenttime for usage in reservation time check.
                this.curDatetime = Date.parse(this.curDate + "T" + this.curTime);

                //check if the starttime(minus 5 minutes) of the reservation is before the currenttime.
                //check if the endtime of the reseration is after the currenttime.
                if ((this.resDatetimeStart - 5000) <= this.curDatetime && this.resDatetimeEnd >= this.curDatetime) {

                  //true means the styling should make the background-color: green.
                  this.qrcodeValid = "true";
                  
                } else {

                  //false means the styling should make the background-color: red.
                  this.qrcodeValid = "false";

                }

              } else {

                this.qrcodeValid = "false";

              }

            } else {

              this.qrcodeValid = "false";

            }

        });

        //After 5 seconds, turns the screen back to white.
        setTimeout(() => {

          this.qrcodeValid = "default";
          
        }, 5000);

    }

}
