import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentification/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { AuthCallbackComponent } from './authentification/auth-callback/auth-callback.component';
import { AuthSilentComponent } from './authentification/auth-silent/auth-silent.component';
import { GreetingsComponent } from './greetings/greetings.component';


const routes: Routes = [
  {
    path: '',
    component: GreetingsComponent,
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
