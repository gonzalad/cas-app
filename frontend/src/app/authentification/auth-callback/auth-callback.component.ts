import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit, OnDestroy {

  private completeAuthenticationSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.completeAuthentication().subscribe();
  }

  ngOnDestroy() {
    if (this.completeAuthenticationSubscription) {
      this.completeAuthenticationSubscription.unsubscribe();
    }
  }
}
