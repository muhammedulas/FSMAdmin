import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/errorResponses/not-found/not-found.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { LoginComponent } from './components/login/login.component';
import { DevicesComponent } from './components/main/devices/devices.component';
import { MainComponent } from './components/main/main.component';
import { SessionsComponent } from './components/main/sessions/sessions.component';
import { UsersComponent } from './components/main/users/users.component';
import { WorkspacesComponent } from './components/main/workspaces/workspaces.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'configure', component: ConfigureComponent },
  {
    path: '', component: MainComponent, canActivate: [AuthguardService], children: [
      { path: "users", component: UsersComponent },
      { path: "workspaces", component: WorkspacesComponent },
      { path: "devices", component: DevicesComponent },
      { path: "sessions", component: SessionsComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
