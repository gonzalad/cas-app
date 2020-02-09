import { Injectable } from '@angular/core';

import { UserManager, User, Log } from 'oidc-client';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, flatMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Ce service gère l'authentification:
 * - initie une authentification OIDC (Open Id Connect) implicit flow
 * - vérifie que l'utilisateur est loggué
 */
@Injectable()
export class AuthService {
  private readonly redirectUri: string = '/auth-callback';
  private readonly silentRedirectUri: string = '/auth-silent';
  private readonly postLogoutUri: string = '/logout';
  private manager: UserManager = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    Log.logger = console;
    Log.level = Log.DEBUG;
  }

  /**
   * Retourne l'utilisateur connecté ou null si il n'y a aucun utilisateur connecté.
   */
  getUser(): Observable<User> {

    // if we're on auth special pages, we don't resolve user (no need to execute authentication)
    if (this.router.url != null && this.router.url.indexOf('/' + this.redirectUri) !== -1) {
      return of(null);
    }

    return this.isSecurityEnabled().pipe(
      mergeMap(enabled => {
        if (enabled === false) {
          // returning since no security is enabled
          return of(null);
        } else {
          return this.userManager().pipe(
            mergeMap(userManager => {
              return from(userManager.getUser());
            })
          );
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      map(user => user != null && !user.expired)
    );
  }

  /**
   * accessToken nécessaire pour l'appel des services backend
   */
  getAccessToken(): Observable<string> {
    return this.getUser().pipe(
      map(user => user ? `${user.access_token}` : null)
    );
  }

  /**
   * Démarre l'authentication OIDC (implicit flow)
   */
  startAuthentication(): Observable<any> {
    sessionStorage.setItem('saved-context.route', location.pathname + location.search + location.hash);
    // let idp = this.queryParams()['idp'];
    // if (idp != null) {
    //   sessionStorage.setItem('saved-context.idp', idp);
    // } else {
    //   idp = sessionStorage.getItem('saved-context.idp');
    // }
    return this.userManager().pipe(
      tap(manager => manager.signinRedirect({
        extraQueryParams: {
          // kc_idp_hint: idp != null ? idp : '',
        },
    }))
    );
  }

  /**
   * Called only when popup is disabled at the end of oidc implicit flow
   */
  completeAuthentication(): Observable<void> {
    return this.userManager().pipe(
      flatMap(manager => manager.signinRedirectCallback()),
      map(user => {
        return this.finishAuthenticationAndRedirect(user);
      })
    );
  }

  /**
   * Renouvellement de l'accessToken en tâche de fond (iframe cachée)
   */
  signinSilentCallback(): void {
    this.userManager().pipe(
      tap(manager => {
        manager.signinSilentCallback();
      })
    );
  }

  private finishAuthenticationAndRedirect(user: User): void {
    let savedRoute = sessionStorage.getItem('saved-context.route');
    if (savedRoute == null) {
      savedRoute = '/';
    }
    this.router.navigateByUrl (savedRoute);
  }

  /**
   * Retourne le profil utilisateur.
   *
   * En private pour le moment (le mieux serait un service d'habilitation pour masque l'utilisation du profil)
   */
  private getClaims(): Observable<any> {
    return this.getUser().pipe(
      map(user => user != null ? user.profile : null)
    );
  }

  private userManager(): Observable<UserManager> {
    if (this.manager == null) {
      return this.getSettings().pipe(
        map(settings => new UserManager(settings)),
        tap(userManager => {
          // initialisation
          userManager.events.addUserSignedOut(() => {
            console.log('user signed out');
          });
          // userManager.events.addSilentRenewError(e => console.log('Error during silent renew ' + e));
          this.manager = userManager;
        })
      );
    } else {
      return of(this.manager);
    }
  }

  isSecurityEnabled(): Observable<boolean> {
    return of(environment.security.enabled);
  }

  private getSettings(): Observable<any> {
    return of({
      authority: environment.authority,
      client_id: environment.client_id,
      redirect_uri: environment.hostname + this.redirectUri,
      post_logout_redirect_uri: environment.hostname + this.postLogoutUri,
      response_type: 'id_token token',
      scope: 'openid',
      silent_redirect_uri: environment.hostname + this.silentRedirectUri,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: true
    });
  }

  private queryParams(): any {
    const params = {};
    let queryString = location.search;
    if (queryString == null) {
      return params;
    }
    if (queryString.indexOf('?') >= 0) {
      queryString = queryString.substr(queryString.indexOf('?') + 1);
    }
    if (queryString.indexOf('#') >= 0) {
      queryString = queryString.substr(0, queryString.indexOf('#'));
    }
    // Split into key/value pairs
    const queries = queryString.split('&');
    if (queries == null) {
      return params;
    }
    // Convert the array of strings into an object
    let i: number;
    for ( i = 0; i < queries.length; i++ ) {
        const temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
  }
}
