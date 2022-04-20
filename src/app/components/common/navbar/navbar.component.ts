import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public routeList = this.global.routeList;
  constructor(private auth: AuthService, private global: GlobalService) { }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
  }


}
