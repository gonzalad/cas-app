import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Ajoute un accessToken à toute requête vers le backend.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.shouldAddAccessToken(request)) {
        // add authorization header with jwt token if available
        return this.authService.getAccessToken().pipe(
          flatMap(accessToken => {
            request = this.addAccessTokenToRequest(accessToken, request);
            return next.handle(request);
          })
        );
      } else {
        return next.handle(request);
      }
  }

  private shouldAddAccessToken(request: HttpRequest<any>): boolean {
    // important: pour éviter une faille de sécurité, l'accesstoken ne doit être ajouté que vers les services internes
    // (jamais vers les services externes)
    if (this.isRequestToExternalSite(request)) {
      return false;
    }
    if (this.isRequestToConfigEndpoint(request)) {
      return false;
    }
    return true;
  }

  private isRequestToExternalSite(request: HttpRequest<any>): boolean {
    return !request.url.startsWith('api') && !request.url.startsWith('/api');
  }

  private isRequestToConfigEndpoint(request: HttpRequest<any>): boolean {
    return request.url.startsWith('api/config') || request.url.startsWith('/api/config');
  }

  /**
   * Retourne une nouvelle instance de request à laquelle on a ajouté l'accessToken (si il existe)
   *
   * @param accessToken [optional] peut être null si la sécurité est désactivée
   * @param request requête http à envoyer
   */
  private addAccessTokenToRequest(accessToken: string, request: HttpRequest<any>): HttpRequest<any> {
    if (accessToken != null) {
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return request;
  }
}
