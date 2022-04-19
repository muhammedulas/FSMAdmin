import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentSession } from '../models/CurrentSession';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/Config';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public sessionData: CurrentSession = new CurrentSession()
  public loggedIn = new Subject<boolean>()


  constructor(private router: Router, private http: HttpClient) { this.loggedIn.next(false) }

  login(username: string, password: string) {
    let config: Config = JSON.parse(localStorage.getItem("config")!)
    let baseUrl = `${config.protocol}://${config.url}:${config.port}`

    let body = `grant_type=password&username=${username}&password=${password}`
    let url = `${baseUrl}/api/auth/login`
    let headers = new HttpHeaders().set("source", "management").set("Content-Type", "text/plain")

    var req = this.http.post<CurrentSession>(url, body, { headers: headers }).subscribe({
      next: res => {
        window.alert(res)
        console.log(res);
        this.sessionData = res;
        this.router.navigate(["/"])
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

}
