import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/Config';
import { NotifierService } from 'src/app/services/notifier.service';



@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})

export class ConfigureComponent implements OnInit {
  constructor(private notifier: NotifierService) { }
  public config: Config = {
    protocol: '',
    url: '',
    port: ''
  }

  ngOnInit() {
    if (localStorage.getItem("config") != null) {
      this.config = JSON.parse(localStorage.getItem("config")!);
    }
  }

  setConfigurations() {
    localStorage.setItem("config", JSON.stringify(this.config));
    this.notifier.success_top_center("Ayarlar Kaydedildi", 1.5);
  }

  getConfigurations() {
    var config = localStorage.getItem("config");
    this.config = JSON.parse(config!);
    return config;
  }

}
