import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate:[AuthguardService]},
  { path: 'login', component: LoginComponent },
  { path: 'configure', component: ConfigureComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
