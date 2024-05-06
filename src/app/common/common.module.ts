import {NgModule} from '@angular/core';
import {Footer} from './components/footer/footer';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {MaterialModule} from '../material/material.module';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {LoadingBarComponent} from './components/loading-bar/loading-bar.component';

@NgModule({
  declarations: [
    Footer,
    NotFoundComponent,
    NotificationsComponent,
    LoadingBarComponent
  ],
  imports: [
    MaterialModule,
    NgClass,
    RouterLink,
    NgIf
  ],
  exports: [
    Footer,
    NotFoundComponent,
    NotificationsComponent,
    LoadingBarComponent
  ]
})

export class SharedModule {
}
