import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-silent',
  templateUrl: './auth-silent.component.html'
})
export class AuthSilentComponent implements OnInit {
  private readonly redirectUri: string = '/auth-callback';
  private readonly silentRedirectUri: string = '/auth-silent';
  private readonly postLogoutUri: string = '/logout';

  constructor() { }

  ngOnInit() {
    // new UserManager({}).signinSilentCallback();
    new UserManager({
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
    }).signinSilentCallback();
  }
}
