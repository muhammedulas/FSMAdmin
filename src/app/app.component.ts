import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FSMAdmin';
  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon("fsm_logo", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logo_koyu_transparent_128x128.svg"))
  }
}
