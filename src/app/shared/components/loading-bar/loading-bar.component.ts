import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store';
import {getApiReqCount} from '../../../store/app/reducers/app.reducer';

@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  isVisible = false;
  apiReq$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.apiReq$ = store.select(getApiReqCount);
  }

  ngOnInit() {
    this.apiReq$.subscribe(result => {
      this.isVisible = result > 0;
    });
  }
}
