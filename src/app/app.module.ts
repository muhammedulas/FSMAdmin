import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


//Declarating imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { DevicesComponent } from './components/main/devices/devices.component';
import { SessionsComponent } from './components/main/sessions/sessions.component';
import { UsersComponent } from './components/main/users/users.component';
import { WorkspacesComponent } from './components/main/workspaces/workspaces.component';
import { AuthguardService } from './services/authguard.service';

//Material İmports
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigureComponent,

    MainComponent,
    DevicesComponent,
    SessionsComponent,
    UsersComponent,
    WorkspacesComponent
  ],
  imports: [
    //Material İmports
    MatCardModule,
    MatFormField,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule


  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
