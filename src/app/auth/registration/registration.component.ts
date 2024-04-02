import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../common/services/auth.service";
import {AlertService} from "../../common/services/alert.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  showSpinner: boolean;

  form: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'passwordConfirmation': new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/dashboard']);
    }
  }

  register(): void {
    this.showSpinner = true;
    this.authService.register(this.form.value)
      .subscribe((result: any): void => {
          this.showSpinner = false;
          if (result) {
            this.alertService.success('Registration complete. Enter your credential for auth.');
            this.router.navigate(['/auth/login']);
          }
        },
        (): void => {
          this.showSpinner = false;
        });
  }
}
