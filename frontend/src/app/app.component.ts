import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentification/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private _isLoggedIn: boolean;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => this._isLoggedIn = isLoggedIn);
  }

  public login() {
    this.router.navigate(['/']).then(() => this.authService.startAuthentication().subscribe());
  }

  public logout() {
    this.authService.signout().subscribe();
  }
}
