import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentification/auth.guard';
import { HelloComponent } from './hello/hello.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthCallbackComponent } from './authentification/auth-callback/auth-callback.component';
import { AuthSilentComponent } from './authentification/auth-silent/auth-silent.component';


const routes: Routes = [
  {
    path: '',
    component: HelloComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'auth-silent', component: AuthSilentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
