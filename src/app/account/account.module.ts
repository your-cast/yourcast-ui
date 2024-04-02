import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LayoutComponent} from "./layout/layout.component";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../common/common.module";
import {
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbPagination
} from '@ng-bootstrap/ng-bootstrap';
import {WelcomeComponent} from "./welcome/welcome.component";
import {ShowCreateComponent} from "./show/create/show-create.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ShowDetailComponent} from "./show/detail/show-detail.component";

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    WelcomeComponent,
    ShowCreateComponent,
    ShowDetailComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        CKEditorModule,
        NgbDropdown,
        NgbDropdownMenu,
        NgbDropdownItem,
        NgbDropdownToggle,
        NgbPagination
    ]
})

export class AccountModule {
}
