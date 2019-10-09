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
    qrcodeValid: string = 'default';
    reservations: Reservation[];

    curDate: string = formatDate(new Date(), 'dd-MM-yyyy', 'en');

    scanSuccessHandler($event): void {

        this.qrcodeText = $event;

        this.scannenService.checkQRCode(this.qrcodeText).subscribe(reservations => {
            this.reservations = reservations;

            if (this.reservations[0] != null){

              if (this.reservations[0].date == this.curDate){

                  this.qrcodeValid = "true";

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
