import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {RouterLink} from '@angular/router';
import {ResetComponent} from './reset/reset.component';
import {MaterialModule} from '../material/material.module';
import {AlertComponent} from '../common/components/alert/alert.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';

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
    RouterLink,
    AlertComponent,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    NgOptimizedImage
  ]
})

export class AuthModule {
}
