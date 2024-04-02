import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService extends ApiService {
  createShow(formData: any): Observable<any> {
    return this.post('v1/show/create', formData);
  }

  updateShow(formData: any, id: any): Observable<any> {
    return this.put('v1/show/update/' + id, formData);
  }

  showList(): Observable<any> {
    return this.get('v1/show/list');
  }

  showShortList(): Observable<any> {
    return this.get('v1/show/short');
  }

  getShowInfo(id: any): Observable<any> {
    return this.get('v1/show/' + id);
  }
}
