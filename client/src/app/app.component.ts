import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private  authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token')

    if (token) {
      this.authService.token = token;
    }
  }
}
