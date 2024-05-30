import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {finalize, Observable, take} from 'rxjs';
import {LoadingService} from '../shared/services/loading.service';

export const fuseLoadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const fuseLoadingService = inject(LoadingService);
  let handleRequestsAutomatically = false;

  fuseLoadingService.auto$
    .pipe(take(1))
    .subscribe((value) => {
      handleRequestsAutomatically = value;
    });

  if (!handleRequestsAutomatically) {
    return next(req);
  }

  fuseLoadingService._setLoadingStatus(true, req.url);

  return next(req).pipe(
    finalize(() => {
      fuseLoadingService._setLoadingStatus(false, req.url);
    }));
};
