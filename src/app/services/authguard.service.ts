import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  public loggedIn = false;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.loginStateAsObservable().subscribe({
      next: (res) => {
        this.loggedIn = res
        if (res == false) { router.navigate(["/login"]) }
      }
    })
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn) { return true }
    else return true
  }

}
