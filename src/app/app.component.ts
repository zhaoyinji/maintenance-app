import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isSuperAdmin = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.router.navigate(['/update-profile']);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
    this.authService.initAuth();
    this.authService.isSuperAdmin().subscribe((isSuperAdmin) => this.isSuperAdmin = isSuperAdmin);
  }

  onLogout() {
    this.authService.logout();
  }
}
