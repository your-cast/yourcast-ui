import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {clearUser, setUser, setUserPermissions} from "../../store/user/actions/user.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
  }

  profile(): any {
    return this.apiService.get('v1/profile').pipe(
      map(response => {
        if (response && response['success']) {
          this.store.dispatch(setUser({data: response['user']}));
          this.store.dispatch(setUserPermissions({data: response['roles']}));
          return response;
        } else {
          return null;
        }
      })
    )
  }

  login(credentials: any): any {
    return this.apiService.post('v1/login', credentials).pipe(
      map(response => {
        if (response && response['access_token']) {
          localStorage.setItem('token', response['access_token']);
          localStorage.setItem('userId', response['user'].id);
          this.store.dispatch(setUser({data: response['user']}));
          this.store.dispatch(setUserPermissions({data: response['roles']}));
          return true;
        } else {
          return false;
        }
      }));
  }

  register(credentials: any): any {
    return this.apiService.post('v1/register', credentials).pipe(
      map(response => {
        return true;
      }));
  }

  logout() {
    this.apiService.get('v1/logout').pipe(
      map(response => {
        return true;
      })).subscribe(response => {
      localStorage.removeItem('token');
      this.store.dispatch(clearUser());
      this.router.navigate(['/auth/login']);
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!(token && token.length);
  }
}
