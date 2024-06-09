import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {NotificationsService} from './notifications.service';
import {Notification} from '../../models/notifications.types';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton | undefined;
  @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any> | undefined;

  notifications: Notification[] | undefined;
  unreadCount: number = 0;
  private _overlayRef: OverlayRef | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _notificationsService: NotificationsService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this._notificationsService.notifications$
      .pipe(takeUntil(this._unsubscribeAll))
      // @ts-ignore
      .subscribe((notifications: Notification[]) => {
        // Load the notifications
        this.notifications = notifications;

        // Calculate the unread count
        this._calculateUnreadCount();

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  openPanel(): void {
    if (!this._notificationsPanel || !this._notificationsOrigin) {
      return;
    }
    if (!this._overlayRef) {
      this._createOverlay();
    }
    // @ts-ignore
    this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
  }

  closePanel(): void {
    // @ts-ignore
    this._overlayRef.detach();
  }

  markAllAsRead(): void {
    this._notificationsService.markAllAsRead().subscribe();
  }

  toggleRead(notification: Notification): void {
    notification.read = !notification.read;
    this._notificationsService.update(notification.id, notification).subscribe();
  }

  delete(notification: Notification): void {
    this._notificationsService.delete(notification.id).subscribe();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _createOverlay(): void {
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'fuse-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        // @ts-ignore
        .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
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

    this._overlayRef.backdropClick().subscribe(() => {
      // @ts-ignore
      this._overlayRef.detach();
    });
  }

  private _calculateUnreadCount(): void {
    let count = 0;
    if (this.notifications && this.notifications.length) {
      count = this.notifications.filter(notification => !notification.read).length;
    }
    this.unreadCount = count;
  }
}
