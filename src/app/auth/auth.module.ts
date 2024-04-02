import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {RouterLink} from "@angular/router";
import {ResetComponent} from "./reset/reset.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class AuthModule {
}
