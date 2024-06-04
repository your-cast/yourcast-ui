import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  success(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['fuse-alert', 'fuse-alert-appearance-soft', 'fuse-alert-type-success']
    });
  }

  error(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['fuse-alert', 'fuse-alert-appearance-soft', 'fuse-alert-type-error']
    });
  }

  info(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['fuse-alert', 'fuse-alert-appearance-soft', 'fuse-alert-type-info']
    });
  }

  warning(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['fuse-alert', 'fuse-alert-appearance-soft', 'fuse-alert-type-warning']
    });
  }
}
