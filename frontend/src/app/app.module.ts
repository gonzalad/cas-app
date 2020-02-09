import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './authentification/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './authentification/jwt.interceptor';
import { AuthGuard } from './authentification/auth.guard';
import { AuthCallbackComponent } from './authentification/auth-callback/auth-callback.component';
import { AuthSilentComponent } from './authentification/auth-silent/auth-silent.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { LogoutComponent } from './logout/logout.component';
import { GreetingsService } from './greetings/greetings.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    AuthSilentComponent,
    GreetingsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    GreetingsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
