import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LayoutComponent} from './layout/layout.component';
import {RoutingModule} from '../routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {ShowCreateComponent} from './show/create/show-create.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ShowComponent} from './show/detail/show.component';
import {MaterialModule} from '../material/material.module';
import {ShowEpisodesComponent} from './show/detail/episodes/show-episodes.component';
import {ShowDetailComponent} from './show/detail/detail/detail.component';
import {EpisodeCreateComponent} from './episode/create/episode-create.component';
import {NgxAudioPlayerModule} from '@khajegan/ngx-audio-player';
import {EpisodeDetailComponent} from './episode/detail/episode-detail.component';
import {ShowDistributionComponent} from './show/detail/distribution/distribution.component';
import {SettingsComponent} from './user/settings/settings.component';
import {SettingsAccountComponent} from './user/settings/settings-account/settings-account.component';
import {SettingsSecurityComponent} from './user/settings/settings-security/settings-security.component';
import {SettingsPlanBillingComponent} from './user/settings/settings-plan-billing/settings-plan-billing.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    WelcomeComponent,
    ShowCreateComponent,
    ShowComponent,
    ShowEpisodesComponent,
    ShowDetailComponent,
    ShowDistributionComponent,
    EpisodeCreateComponent,
    EpisodeDetailComponent,
    SettingsComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    SettingsPlanBillingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule,
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
