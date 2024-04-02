import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showProfile: boolean = false;
  loading: boolean = true;
  user: any = {};
  notifications: [] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.profile().subscribe((response: any): void => {
      this.user = response.user;
      this.notifications = response.notifications;
      this.loading = false;
    });
  }

  logOut(): void {
    this.authService.logout();
  }

  handleMoveToDetail(id: string): void  {
    this.router.navigate(['/users/detail/' + id]);
  }

  handleMoveToNotifications(id: string): void {
    this.router.navigate(['/notifications']);
  }

  showUserDetail($event: MouseEvent): void {
    $event.preventDefault();
    this.showProfile = !this.showProfile;
  }
}
