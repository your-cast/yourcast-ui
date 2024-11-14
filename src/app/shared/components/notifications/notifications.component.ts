import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Notification} from '../../models/notifications.types';
import {MatButton} from '@angular/material/button';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @ViewChild('notificationsButton') private notificationsButton: MatButton | undefined;
  @ViewChild('notificationsPanel') private notificationsPanel: TemplateRef<any> | undefined;

  notifications: Notification[] | undefined;
  unreadCount: number = 0;
  private overlayRef: OverlayRef | undefined;

  constructor(
    private notificationsService: NotificationsService,
    private overlay: Overlay,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.notificationsService.getNotifications()
      .subscribe(response => {
        this.notifications = response.result;
        this._calculateUnreadCount();
      });
  }

  openPanel(): void {
    if (!this.notificationsPanel || !this.notificationsButton) {
      return;
    }
    if (!this.overlayRef) {
      this._createOverlay();
    }
    this.overlayRef?.attach(new TemplatePortal(this.notificationsPanel, this.viewContainer));
  }

  closePanel(): void {
    this.overlayRef?.detach();
  }

  toggleMarkAllAsRead(): void {
    this.notificationsService.markAllAsRead().subscribe();
  }

  toggleRead(notification: Notification): void {
    notification.is_read = !notification.is_read;
    this.notificationsService.update(notification.id, notification).subscribe();
  }

  private _createOverlay(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'fuse-backdrop-on-mobile',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.notificationsButton?._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
          }
        ])
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.detach();
    });
  }

  private _calculateUnreadCount(): void {
    let count = 0;
    if (this.notifications && this.notifications.length) {
      count = this.notifications.filter(notification => !notification.is_read).length;
    }
    this.unreadCount = count;
  }
}
