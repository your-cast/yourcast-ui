import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends ApiService {

  getNotifications(): Observable<any> {
    return this.get('v1/notifications/unread');
  }

  markAllAsRead(): Observable<any> {
    return this.get('v1/notifications/unread');
  }

  update(id: string, notification: any): Observable<any> {
    return this.get('v1/notifications/unread');
  }
}
