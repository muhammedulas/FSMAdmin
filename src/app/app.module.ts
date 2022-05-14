//Declarating imports
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { DevicesComponent } from './components/main/devices/devices.component';
import { SessionsComponent } from './components/main/sessions/sessions.component';
import { UsersComponent } from './components/main/users/users.component';
import { WorkspacesComponent } from './components/main/workspaces/workspaces.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';

import { AuthguardService } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { EncryptionService } from './services/encryption.service';

import { SearchUserPipe } from '../app/pipes/searchUser';


//Material İmports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';



//Other Module Imports
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { SessionsService } from './services/component-services/sessions.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigureComponent,
    NavbarComponent,
    FooterComponent,

    MainComponent,
    DevicesComponent,
    SessionsComponent,
    UsersComponent,
    WorkspacesComponent,

    SearchUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ maxOpened: 3, autoDismiss: true, preventDuplicates: true, resetTimeoutOnDuplicate: true, includeTitleDuplicates: true }),
    NgbModule,

    //Material İmports
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule

  ],
  providers: [AuthguardService, AuthService, EncryptionService, { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }, SessionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
