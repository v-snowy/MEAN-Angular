import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from 'src/app/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/register-page/register-page.component';
import { AuthComponent } from './auth-page/auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class AuthModule {}
