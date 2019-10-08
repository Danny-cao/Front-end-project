import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scannen',
  templateUrl: './scannen.component.html',
  styleUrls: ['./scannen.component.css']
})

export class ScannenComponent {

    @ViewChild('scanner', {static: false})
    scanner: ZXingScannerComponent;

    qrcodeText: string;

    scanSuccessHandler($event): void {

        this.qrcodeText = $event;
        console.log("Gescande QR-Code: ", this.qrcodeText);

    }

}
