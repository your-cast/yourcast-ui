import {NgModule} from '@angular/core';
import {Footer} from "./components/footer/footer";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {NotificationsComponent} from './components/notifications/notifications.component';
import {MaterialModule} from '../material/material.module';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@NgModule({
  declarations: [
    Footer,
    NotFoundComponent,
    NotificationsComponent
  ],
  imports: [
    MaterialModule,
    NgClass,
    RouterLink
  ],
  exports: [
    Footer,
    NotFoundComponent,
    NotificationsComponent
  ],
})
export class SharedModule {
}
