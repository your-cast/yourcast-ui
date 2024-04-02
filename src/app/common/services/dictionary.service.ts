import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService extends ApiService {
  getTimezonesDictionary(): Observable<any> {
    return this.get('v1/dictionary/timezones');
  }

  getLanguagesDictionary(): Observable<any> {
    return this.get('v1/dictionary/languages');
  }

  getCategoriesDictionary(): Observable<any> {
    return this.get('v1/dictionary/categories');
  }
}
