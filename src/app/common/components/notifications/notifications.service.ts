import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Notification} from '../../models/notifications.types';
import {map, Observable, ReplaySubject, switchMap, take, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  get notifications$(): Observable<Notification[]> {
    return this._notifications.asObservable();
  }

  getAll(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>('api/common/notifications').pipe(
      tap((notifications) => {
        this._notifications.next(notifications);
      })
    );
  }

  create(notification: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications => this._httpClient.post<Notification>('api/common/notifications', {notification}).pipe(
        map((newNotification) => {
          // Update the notifications with the new notification
          this._notifications.next([...notifications, newNotification]);

          // Return the new notification from observable
          return newNotification;
        })
      ))
    );
  }

  update(id: string, notification: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications => this._httpClient.patch<Notification>('api/common/notifications', {
        id,
        notification
      }).pipe(
        map((updatedNotification: Notification) => {
          // Find the index of the updated notification
          const index = notifications.findIndex(item => item.id === id);

          // Update the notification
          notifications[index] = updatedNotification;

          // Update the notifications
          this._notifications.next(notifications);

          // Return the updated notification
          return updatedNotification;
        })
      ))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications => this._httpClient.delete<boolean>('api/common/notifications', {params: {id}}).pipe(
        map((isDeleted: boolean) => {
          // Find the index of the deleted notification
          const index = notifications.findIndex(item => item.id === id);

          // Delete the notification
          notifications.splice(index, 1);

          // Update the notifications
          this._notifications.next(notifications);

          // Return the deleted status
          return isDeleted;
        })
      ))
    );
  }

  markAllAsRead(): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications => this._httpClient.get<boolean>('api/common/notifications/mark-all-as-read').pipe(
        map((isUpdated: boolean) => {
          // Go through all notifications and set them as read
          notifications.forEach((notification, index) => {
            notifications[index].read = true;
          });

          // Update the notifications
          this._notifications.next(notifications);

          // Return the updated status
          return isUpdated;
        })
      ))
    );
  }
}
