import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentSession } from '../models/CurrentSession';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/Config';
import { HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public sessionData: CurrentSession = new CurrentSession()
  public loggedIn = new Subject<boolean>()


  constructor(private router: Router, private http: HttpClient, private global: GlobalService) { this.loggedIn.next(false) }

  login(username: string, password: string) {
    let baseUrl = this.global.getBaseUrl();
    let url = `${baseUrl}/api/auth/login`;

    let body = `grant_type=password&username=${username}&password=${password}`;
    let headers = new HttpHeaders().set("source", "management").set("Content-Type", "text/plain");

    var req = this.http.post<CurrentSession>(url, body, { headers: headers }).subscribe({
      next: res => {
        this.sessionData = res;
        this.loggedIn.next(true);
        this.router.navigate(["/"]);
      },
      error: err => {
        window.alert(err.error.error_description)
        console.log(err)
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }

  logout() {
    let url = `${this.global.getBaseUrl()}/api/auth/logout`
    let headers = new HttpHeaders().set("Authorization", `Bearer ${this.sessionData.access_token}`).set("Accept", "application/json")
    var req = this.http.get(url, { headers: headers }).subscribe({
      next: () => {
        this.sessionData = new CurrentSession();
        this.loggedIn.next(false);
        return true;
      },
      error: err => {
        console.log(err);
        window.alert(err.description);
        return false;
      },
      complete: () => {
        req.unsubscribe();
      }
    })
  }

}
