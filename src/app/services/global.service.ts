import { Injectable } from '@angular/core';
import { Config } from '../models/Config';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public routeList = [{
    title: "Kullanıcılar",
    path: "/users",
    icon: ""
  }, {
    title: "Çalışma Alanları",
    path: "/workspaces",
    icon: ""
  }, {
    title: "Cihazlar",
    path: "/devices",
    icon: ""
  }, {
    title: "Oturumlar",
    path: "/sessions",
    icon: ""
  }]

  constructor() { }

  getBaseUrl() {
    let config: Config = JSON.parse(localStorage.getItem("config")!)
    return `${config.protocol}://${config.url}:${config.port}`
  }


}
