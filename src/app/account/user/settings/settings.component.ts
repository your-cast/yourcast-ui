import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {Subject, takeUntil} from 'rxjs';
// import {SettingsAccountComponent} from './settings-account/settings-account.component';
// import {SettingsPlanBillingComponent} from './settings-plan-billing/settings-plan-billing.component';
// import {SettingsSecurityComponent} from './settings-security/settings-security.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'settings-account';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.panels = [
      {
        id: 'settings-account',
        icon: 'heroicons_outline:user-circle',
        title: 'Account',
        description: 'Manage your public and private information'
      },
      {
        id: 'settings-security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Security',
        description: 'Manage your password'
      },
      {
        id: 'settings-plan-billing',
        icon: 'heroicons_outline:credit-card',
        title: 'Plan & Billing',
        description: 'Manage your subscription plan, payment method and billing information'
      }
    ];
  }

  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer?.close();
    }
  }

  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
