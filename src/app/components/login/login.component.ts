import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EncryptionService } from 'src/app/services/encryption.service';

interface ILoginFormData {
  username: string;
  password: string;
  loginButtonActive: boolean;
  rememberCredentials: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormData: ILoginFormData = {
    username: '',
    password: '',
    loginButtonActive: false,
    rememberCredentials: false
  }
  constructor(private encryption: EncryptionService, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem("loginCredentials") != null) {
      var data: ILoginFormData = JSON.parse(this.encryption.decrypt(localStorage.getItem("loginCredentials")!))
      if (data.rememberCredentials) {
        this.loginFormData = data
      }
    }
  }

  login() {
    console.log("submitted")
    this.authService.login(this.loginFormData.username, this.loginFormData.password)
  }

  onChange() {
    if (this.loginFormData.rememberCredentials == true) {
      localStorage.setItem("loginCredentials", this.encryption.encrypt(JSON.stringify(this.loginFormData)))
      console.log(localStorage.getItem("loginCredentials"))
    }
    else {
      localStorage.removeItem("loginCredentials")
    }
  }

}
