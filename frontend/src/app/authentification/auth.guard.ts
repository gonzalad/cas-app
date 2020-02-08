import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService: AuthService) {
}

canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // location.href.indexOf('/auth-')  is a hack (AuthGuard is executed even on auth-callback route
      // see front end devs to solve the issue
      if (location.href.indexOf('/auth-') !== -1) {
        return Promise.resolve(true);
      }
      return this.authService.isLoggedIn().pipe(
        mergeMap(loggedIn => {
          if (loggedIn) {
            return of(true);
          }
          return this.authService.isSecurityEnabled().pipe(
            mergeMap(enabled => {
              if (enabled) {
                return this.authService.startAuthentication().pipe(
                  map(data => false)
                );
              } else {
                return of(true);
              }
            })
          );
        })
      );
  }
}
