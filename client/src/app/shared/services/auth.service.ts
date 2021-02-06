import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces';

@Injectable()
export class AuthService {
  private authKey = 'auth-token';

  private _token: string;
  get token() {
    return this._token;
  }
  set token(value: string) {
    if (!value) { return; }
    this._token = value;
  }

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<{ token: string }> {
    if (!user) { return; }
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(x => {
          localStorage.setItem(this.authKey, x.token);
          this.token = x.token;
        })
      )
  }

  logout(): void {
    this.token = null;
    localStorage.setItem(this.authKey, '');
  }

  register(user: User): Observable<User> {
    if (!user) { return; }
    return this.http.post<User>('/api/auth/register', user)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

}
