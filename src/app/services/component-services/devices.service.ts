import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllowedDevice } from 'src/app/models/AllowedDevice';
import { AuthPendingDevice } from 'src/app/models/AuthPendingDevice';
import { BlockedDevice } from 'src/app/models/BlockedDevice';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllowedDevices(explicitLoad: boolean = false) {
    var url = `${this.auth.getBaseUrl()}/api/admin/devices/allowed?explicitLoad=${explicitLoad}`
    var headers = this.auth.getGlobalHeader()

    return this.http.get<AllowedDevice[]>(url, { headers: headers })
  }


  getPendingDevices(explicitLoad: boolean = false) {
    var url = `${this.auth.getBaseUrl()}/api/admin/devices/authPending?explicitLoad=${explicitLoad}`
    var headers = this.auth.getGlobalHeader()

    return this.http.get<AuthPendingDevice[]>(url, { headers: headers })
  }

  getBlockedDevices(explicitLoad: boolean = false) {
    var url = `${this.auth.getBaseUrl()}/api/admin/devices/blocked?explicitLoad=${explicitLoad}`
    var headers = this.auth.getGlobalHeader()

    return this.http.get<BlockedDevice[]>(url, { headers: headers })
  }


  allow(id: number, currentStatus: string) {
    var url = `${this.auth.getBaseUrl()}/api/admin/devices/${currentStatus}/${id}/authorize`

    return this.http.get(url, { headers: this.auth.getGlobalHeader() })
  }


  block(id: number, currentStatus: string) {
    var url = `${this.auth.getBaseUrl()}/api/admin/devices/${currentStatus}/${id}/block`

    return this.http.get(url, { headers: this.auth.getGlobalHeader() })
  }


}
