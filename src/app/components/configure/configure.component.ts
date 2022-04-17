import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


export interface IConfig {
  protocol: string;
  url: string;
  port: string;
  routePrefix?: string;
}

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})

export class ConfigureComponent implements OnInit {
  constructor(private service: AuthService) { }
  public config:IConfig = {
    protocol: '',
    url: '',
    port: ''
  }
  
  ngOnInit() {
    if(localStorage.getItem("config") != null){
      this.config = JSON.parse(localStorage.getItem("config")!)
    }
  }

  setConfigurations(){
    localStorage.setItem("config", JSON.stringify(this.config))
  }

  getConfigurations(){
    var config = localStorage.getItem("config");
    this.config = JSON.parse(config!)
    return config;
  }

}
