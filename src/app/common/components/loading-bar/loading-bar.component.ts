import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {NgIf} from '@angular/common';
import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {Subject, takeUntil} from 'rxjs';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'fuse-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'fuseLoadingBar',
  standalone: true,
  imports: [NgIf, MatProgressBarModule]
})
export class FuseLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() autoMode: boolean = true;
  mode: 'determinate' | 'indeterminate' | undefined;
  progress: number = 0;
  show: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _fuseLoadingService: LoadingService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('autoMode' in changes) {
      this._fuseLoadingService.setAutoMode(coerceBooleanProperty(changes['autoMode'].currentValue));
    }
  }

  ngOnInit(): void {
    this._fuseLoadingService.mode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.mode = value;
      });

    this._fuseLoadingService.progress$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.progress = value;
      });

    this._fuseLoadingService.show$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.show = value;
      });

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
