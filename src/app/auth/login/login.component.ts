import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner: boolean;

  showAlert: boolean = false;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  signIn(): void {
    this.showSpinner = true;
    this.authService.login(this.signInForm.value)
      .subscribe((result: any): void => {
          this.showSpinner = false;
          if (result && this.authService.isLoggedIn()) {
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            returnUrl = returnUrl !== '/auth/login' ? returnUrl : null;
            this.router.navigate([returnUrl || '/dashboard']);
          } else {
            this.authService.logout();
          }
        },
        (): void => {
          this.alertService.error('Invalid credentials. Email not found or wrong password.');
          this.showSpinner = false;
        });
  }
}
