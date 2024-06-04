import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiService {
  uploadImage(formData: FormData): Observable<any> {
    return this.post('v1/upload-image', formData);
  }
}
