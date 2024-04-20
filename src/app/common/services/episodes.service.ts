import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService extends ApiService {
  createEpisode(formData: any): Observable<any> {
    return this.post('v1/episodes/create', formData);
  }

  listEpisodes(): Observable<any> {
    return this.get('v1/episodes/list');
  }

  showEpisodesList(showId: any, page: number): Observable<any> {
    return this.get('v1/episodes/show/' + showId + '/list?page=' + page);
  }

  getEpisodeInfo(id: any): Observable<any> {
    return this.get('v1/episodes/' + id);
  }
}
