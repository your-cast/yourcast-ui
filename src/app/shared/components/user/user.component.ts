import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  handleProfile(): void {
    this.router.navigate(['/user/profile']);
  }

  handleSettings(): void {
    this.router.navigate(['/user/settings']);
  }

  handleSignOut(): void {

  }
}
