import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionsService {

    constructor(private http: HttpClient, private auth: AuthService) { }

}
