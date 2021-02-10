import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  minLengthPassword = 5;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(this.minLengthPassword)])
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.authService.register(this.form.value)
      .pipe(
        untilDestroyed(this))
      .subscribe(
        () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
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
