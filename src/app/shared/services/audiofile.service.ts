import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioFileService extends ApiService {
  uploadAudioFile(formData: FormData): Observable<any> {
    return this.post('v1/upload-audio', formData);
  }
}
