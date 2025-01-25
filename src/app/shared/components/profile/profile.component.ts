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

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileButton') private profileButton: MatButton | undefined;
  @ViewChild('profilePanel') private profilePanel: TemplateRef<any> | undefined;

  notifications: Notification[] | undefined;
  private overlayRef: OverlayRef | undefined;

  constructor(
    private overlay: Overlay,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnInit(): void {

  }

  openPanel(): void {
    if (!this.profilePanel || !this.profileButton) {
      return;
    }
    if (!this.overlayRef) {
      this.createOverlay();
    }
    this.overlayRef?.attach(new TemplatePortal(this.profilePanel, this.viewContainer));
  }

  closePanel(): void {
    this.overlayRef?.detach();
  }

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'fuse-backdrop-on-mobile',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.profileButton?._elementRef.nativeElement)
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
}
