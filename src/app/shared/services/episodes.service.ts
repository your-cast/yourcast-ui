import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {data} from 'autoprefixer';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService extends ApiService {
  createEpisode(formData: any): Observable<any> {
    return this.post('v1/episodes/create', formData);
  }

  updateEpisode(formData: any, id: any): Observable<any> {
    return this.patch('v1/episodes/' + id, formData);
  }

  updateEpisodeStatus(data: any, id: any): Observable<any> {
    return this.patch('v1/episodes/status/' + id, data);
  }

  showEpisodesList(showId: any, page: number): Observable<any> {
    return this.get('v1/episodes/show/' + showId + '/list?page=' + page);
  }

  getEpisodeInfo(id: any): Observable<any> {
    return this.get('v1/episodes/' + id);
  }
}
