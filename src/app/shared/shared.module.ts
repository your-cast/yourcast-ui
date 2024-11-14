import {NgModule} from '@angular/core';
import {Footer} from './components/footer/footer';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {MaterialModule} from '../material/material.module';
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {LoadingBarComponent} from './components/loading-bar/loading-bar.component';
import {UserComponent} from './components/user/user.component';

@NgModule({
  declarations: [
    Footer,
    NotFoundComponent,
    NotificationsComponent,
    UserComponent,
    LoadingBarComponent
  ],
  imports: [
    MaterialModule,
    RouterLink,
    NgClass,
    NgIf,
    NgForOf,
    NgTemplateOutlet
  ],
  exports: [
    Footer,
    NotFoundComponent,
    NotificationsComponent,
    UserComponent,
    LoadingBarComponent
  ]
})

export class SharedModule {
}
