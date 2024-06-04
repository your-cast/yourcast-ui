import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-registration',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  showSpinner: boolean;
  hide = true;

  form = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'password_confirmation': new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/dashboard']);
    }
  }

  signIn(credentials: any): any {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.get(field)?.markAsTouched({onlySelf: true});
      });
      return false;
    }

    this.showSpinner = true;
    this.authService.register(credentials)
      .subscribe((result: any) => {
          this.showSpinner = false;
          if (result) {
            // this.alertService.success('Registration complete. Enter your credential for auth.');
            this.router.navigate(['/auth/login']);
          }
        },
        () => {
          this.showSpinner = false;
        });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
