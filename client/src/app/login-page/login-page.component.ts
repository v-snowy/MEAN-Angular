import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  minLengthPassword = 5;

  constructor(private  authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(this.minLengthPassword)])
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['registered']) {
          MaterialService.toast('Now you can login on site');
        } else if (params['accessDenied']) {
          MaterialService.toast('Login with your email and password');
        } else if (params['sessionExpired']) {
          MaterialService.toast('Session has expired please login again');
        }
      })
  }

  onSubmit(): void {
    this.form.disable();
    const user: User = this.form.value;
    this.authService.login(user)
      .pipe(
        untilDestroyed(this))
      .subscribe(
        () => this.router.navigate(['/overview']),
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        })
  }

  isControlInvalid(controlName: string): boolean {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }

  ngOnDestroy(): void {
  }

}
