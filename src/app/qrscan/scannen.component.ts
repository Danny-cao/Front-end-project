import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { ScannenService } from '../scannen.service';

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

    scanSuccessHandler($event): void {

        this.qrcodeText = $event;
        console.log("Gescande QR-Code: ", this.qrcodeText);

        if ((this.scannenService.checkQRCode(this.qrcodeText)) == true){
          //scherm groen
        } else {
          //scherm rood
        }

    }

}
