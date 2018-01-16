// @angular imports ----------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// app-component import ------------------------------------------------------------
import { AppComponent } from './app.component';


// component imports ---------------------------------------------------------------
import { LoginComponent } from './components/login/login.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { AdminUserResetpasswordComponent } from './components/admin-user-resetpassword/admin-user-resetpassword.component';
import { AdminUserNewComponent } from './components/admin-user-new/admin-user-new.component';
import { AdminUserDeleteComponent } from './components/admin-user-delete/admin-user-delete.component';

import { AdminGrouplistComponent } from './components/admin-grouplist/admin-grouplist.component';
import { AdminGroupNewComponent } from './components/admin-group-new/admin-group-new.component';
import { AdminGroupViewComponent } from './components/admin-group-view/admin-group-view.component';
import { AdminGroupDeleteComponent } from './components/admin-group-delete/admin-group-delete.component';
import { AdminGroupEditComponent } from './components/admin-group-edit/admin-group-edit.component';

import { AdminPathlistComponent } from './components/admin-pathlist/admin-pathlist.component';

import { UserComponent } from './components/user/user.component';


// UI component imports --------------------------------------------------------------
import { UiAdminContentHeaderComponent } from './ui-components/admin/ui-admin-content-header/ui-admin-content-header.component';
import { UiAdminFormButtonsComponent } from './ui-components/admin/ui-admin-form-buttons/ui-admin-form-buttons.component';
import { UiAdminListHeaderComponent } from './ui-components/admin/ui-admin-list-header/ui-admin-list-header.component';


// routing import ---------------------------------------------------------------------
import { AppRoutingModule } from './app-routing.module';


// routing guards imports (services) --------------------------------------------------
import { IsAdminGuard, IsUserGuard } from './services/router-guards/router-guards.service';
import { PendingChangesGuard } from './services/router-guards/router-guards.service';


// services imports --------------------------------------------------------------------
import { AuthenticationService } from './services/authentication/authentication.service';
import { BackendApiService } from './services/backend-api/backend-api.service';



// directive imports --------------------------------------------------------------------
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/unique-username-validator.directive';
import { UniqueGroupNameValidatorDirective } from './directives/unique-group-name-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    AdminUserlistComponent,
    AdminGrouplistComponent,
    AdminPathlistComponent,
    AdminHomeComponent,
    AdminUserEditComponent,
    AdminUserViewComponent,
    AdminUserResetpasswordComponent,
    AdminUserNewComponent,
    EqualValidatorDirective,
    UniqueUsernameValidatorDirective,
    UniqueGroupNameValidatorDirective,
    UiAdminContentHeaderComponent,
    UiAdminListHeaderComponent,
    AdminUserDeleteComponent,
    UiAdminFormButtonsComponent,
    AdminGroupNewComponent,
    AdminGroupViewComponent,
    AdminGroupDeleteComponent,
    AdminGroupEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    BackendApiService,
    IsAdminGuard,
    IsUserGuard,
    PendingChangesGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
