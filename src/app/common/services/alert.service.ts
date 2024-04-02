import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private toastr: ToastrService
  ) {
  }

  success(message: string): void {
    this.toastr.success(message, '', {
      timeOut: 6000
    });
  }

  error(message: string): void {
    this.toastr.error(message, '', {
      timeOut: 6000
    });
  }

  info(message: string): void {
    this.toastr.info(message, '', {
      timeOut: 6000
    });
  }

  warn(message: string): void {
    this.toastr.warning(message, '', {
      timeOut: 6000
    });
  }
}
