import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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

  isScreenSmall: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/material-twotone.svg'));
    matIconRegistry.addSvgIconSetInNamespace('mat_outline', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/material-outline.svg'));
    matIconRegistry.addSvgIconSetInNamespace('mat_solid', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/material-solid.svg'));
    matIconRegistry.addSvgIconSetInNamespace('feather', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/feather.svg'));
    matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-outline.svg'));
    matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-solid.svg'));
    matIconRegistry.addSvgIconSetInNamespace('heroicons_mini', domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-mini.svg'));
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

  handleMoveToDashboard(): void {
    this.router.navigate(['/dashboard']);
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
