import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionsService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getActiveSessions() {
        var url = `${this.auth.getBaseUrl()}/api/admin/sessions`;
        return this.http.get(url, { headers: this.auth.getGlobalHeader() });
    }

    getActiveSession(id: number) {
        var url = `${this.auth.getBaseUrl()}/api/admin/sessions/${id}`;
        return this.http.get(url, { headers: this.auth.getGlobalHeader() });
    }

    terminateSession(id: number) {
        var url = `${this.auth.getBaseUrl()}/api/admin/sessions/${id}/terminate`;
        return this.http.get(url, { headers: this.auth.getGlobalHeader() });
    }

}
