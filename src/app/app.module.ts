import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ROOT_REDUCER} from './store/root.reducer';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AuthTokenInterceptor} from './interceptors/auth-token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RoutingModule} from './routing.module';
import {AppComponent} from './app.component';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material/material.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [
        RouterModule
    ], imports: [BrowserModule,
        RoutingModule,
        AuthModule,
        AccountModule,
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(ROOT_REDUCER, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })

export class AppModule {
}
