import {NgModule} from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './auth/registration/registration.component';
import {LoginComponent} from './auth/login/login.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './guard/auth.guard';
import {ResetComponent} from './auth/reset/reset.component';
import {DashboardComponent} from './account/dashboard/dashboard.component';
import {LayoutComponent} from './account/layout/layout.component';
import {ShowComponent} from './account/show/detail/show.component';
import {WelcomeComponent} from './account/welcome/welcome.component';
import {ShowCreateComponent} from './account/show/create/show-create.component';
import {EpisodeCreateComponent} from './account/episode/create/episode-create.component';
import {EpisodeDetailComponent} from './account/episode/detail/episode-detail.component';
import {SettingsComponent} from './account/user/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: mapToCanActivate([AuthGuard]),
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: 'show/create',
        component: ShowCreateComponent
      },
      {
        path: 'show/detail/:id',
        component: ShowComponent
      },
      {
        path: 'episode/create/:id',
        component: EpisodeCreateComponent
      },
      {
        path: 'episode/detail/:id',
        component: EpisodeDetailComponent
      },
      {
        path: 'user/profile',
        component: SettingsComponent
      },
      {
        path: 'user/settings',
        component: SettingsComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
