import { Injectable } from '@angular/core';
import { Config } from '../models/Config';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  getBaseUrl() {
    let config: Config = JSON.parse(localStorage.getItem("config")!)
    return `${config.protocol}://${config.url}:${config.port}`
  }

  
}
