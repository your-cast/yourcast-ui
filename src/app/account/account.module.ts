import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LayoutComponent} from './layout/layout.component';
import {AppRoutingModule} from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../common/common.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {ShowCreateComponent} from './show/create/show-create.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ShowComponent} from './show/detail/show.component';
import {MaterialModule} from '../material/material.module';
import {ShowEpisodesComponent} from './show/detail/episodes/show-episodes.component';
import {ShowDetailComponent} from './show/detail/detail/detail.component';
import {EpisodeCreateComponent} from './episode/create/episode-create.component';
import {NgxAudioPlayerModule} from '@khajegan/ngx-audio-player';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    WelcomeComponent,
    ShowCreateComponent,
    ShowComponent,
    ShowEpisodesComponent,
    ShowDetailComponent,
    EpisodeCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    CKEditorModule,
    NgxAudioPlayerModule
  ]
})

export class AccountModule {
}
