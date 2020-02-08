import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './authentification/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './authentification/jwt.interceptor';
import { AuthGuard } from './authentification/auth.guard';
import { AuthCallbackComponent } from './authentification/auth-callback/auth-callback.component';
import { AuthSilentComponent } from './authentification/auth-silent/auth-silent.component';
import { HelloComponent } from './hello/hello.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    AuthSilentComponent,
    HelloComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
