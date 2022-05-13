import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers() {
    let url = `${this.auth.getBaseUrl()}/api/admin/users`;
    return this.http.get<User[]>(url, { headers: this.auth.getGlobalHeader() });
  }

  getUser(id: number) {
    let url = `${this.auth.getBaseUrl()}/api/admin/users/${id}`;
    return this.http.get<User>(url, { headers: this.auth.getGlobalHeader() });
  }
}
