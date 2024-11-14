import {Component, Inject} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {filter, take} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'your-cast-settings-account';

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _router: Router
  ) {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe((): void => {
        this.hide();
      });
  }

  show(): void {
    this._document.body.classList.remove('fuse-splash-screen-hidden');
  }

  hide(): void {
    this._document.body.classList.add('fuse-splash-screen-hidden');
  }
}
