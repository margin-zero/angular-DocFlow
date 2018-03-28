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

import { AdminUserGroupsComponent } from './components/admin-user-groups/admin-user-groups.component';
import { AdminUserGroupsDeleteComponent } from './components/admin-user-groups-delete/admin-user-groups-delete.component';
import { AdminGroupUsersComponent } from './components/admin-group-users/admin-group-users.component';


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
import { IsAdminGuard, IsUserGuard, IsAuthenticatedGuard } from './services/router-guards/router-guards.service';
import { PendingChangesGuard } from './services/router-guards/router-guards.service';


// services imports --------------------------------------------------------------------
import { AuthenticationService } from './services/authentication/authentication.service';
import { BackendApiService } from './services/backend-api/backend-api.service';
import { GlobalFunctionsService } from './services/global-functions/global-functions.service';


// directive imports --------------------------------------------------------------------
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/unique-username-validator.directive';
import { UniqueGroupNameValidatorDirective } from './directives/unique-group-name-validator.directive';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminPathNewComponent } from './components/admin-path-new/admin-path-new.component';
import { AdminPathViewComponent } from './components/admin-path-view/admin-path-view.component';
import { AdminPathEditComponent } from './components/admin-path-edit/admin-path-edit.component';
import { UniquePathNameValidatorDirective } from './directives/unique-path-name-validator.directive';
import { AdminActionlistComponent } from './components/admin-actionlist/admin-actionlist.component';
import { AdminActionNewComponent } from './components/admin-action-new/admin-action-new.component';
import { UniqueActionNameValidatorDirective } from './directives/unique-action-name-validator.directive';
import { AdminActionDeleteComponent } from './components/admin-action-delete/admin-action-delete.component';
import { AdminActionViewComponent } from './components/admin-action-view/admin-action-view.component';
import { AdminActionEditComponent } from './components/admin-action-edit/admin-action-edit.component';
import { NoLeadingSpacesValidatorDirective } from './directives/no-leading-spaces-validator.directive';
import { AdminPathstepNewComponent } from './components/admin-pathstep-new/admin-pathstep-new.component';
import { AdminPathstepEditComponent } from './components/admin-pathstep-edit/admin-pathstep-edit.component';
import { AdminPathstepGroupsComponent } from './components/admin-pathstep-groups/admin-pathstep-groups.component';
import { AdminPathstepGroupsDeleteComponent } from './components/admin-pathstep-groups-delete/admin-pathstep-groups-delete.component';
import { AdminPathstepDeleteComponent } from './components/admin-pathstep-delete/admin-pathstep-delete.component';
import { AdminPathDeleteComponent } from './components/admin-path-delete/admin-path-delete.component';
import { AdminAuthorlistComponent } from './components/admin-authorlist/admin-authorlist.component';
import { AdminAuthorNewComponent } from './components/admin-author-new/admin-author-new.component';
import { UniqueAuthorNameValidatorDirective } from './directives/unique-author-name-validator.directive';
import { AdminAuthorViewComponent } from './components/admin-author-view/admin-author-view.component';
import { AdminAuthorEditComponent } from './components/admin-author-edit/admin-author-edit.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserDocumentNewComponent } from './components/user-document-new/user-document-new.component';
import { ToolSelectAuthorComponent } from './components/tool-select-author/tool-select-author.component';
import { UiUserToolHeaderComponent } from './ui-components/user/ui-user-tool-header/ui-user-tool-header.component';
import { ToolSelectPathComponent } from './components/tool-select-path/tool-select-path.component';
import {
  ToolSelectDocumentsNotReadyComponent
  } from './components/tool-select-documents-not-ready/tool-select-documents-not-ready.component';

import { ToolDisplaySelectedDocumentComponent } from './components/tool-display-selected-document/tool-display-selected-document.component';
import {
  ToolDisplaySelectedDocumentHistoryComponent
  } from './components/tool-display-selected-document-history/tool-display-selected-document-history.component';
import { ToolSelectDocumentsNotAssignedComponent } from './components/tool-select-documents-not-assigned/tool-select-documents-not-assigned.component';
import { ToolSelectDocumentsAssignedComponent } from './components/tool-select-documents-assigned/tool-select-documents-assigned.component';





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
    AdminGroupEditComponent,
    AdminUserGroupsComponent,
    AdminUserGroupsDeleteComponent,
    AdminGroupUsersComponent,
    ChangePasswordComponent,
    AdminPathNewComponent,
    AdminPathViewComponent,
    AdminPathEditComponent,
    UniquePathNameValidatorDirective,
    AdminActionlistComponent,
    AdminActionNewComponent,
    UniqueActionNameValidatorDirective,
    AdminActionDeleteComponent,
    AdminActionViewComponent,
    AdminActionEditComponent,
    NoLeadingSpacesValidatorDirective,
    AdminPathstepNewComponent,
    AdminPathstepEditComponent,
    AdminPathstepGroupsComponent,
    AdminPathstepGroupsDeleteComponent,
    AdminPathstepDeleteComponent,
    AdminPathDeleteComponent,
    AdminAuthorlistComponent,
    AdminAuthorNewComponent,
    UniqueAuthorNameValidatorDirective,
    AdminAuthorViewComponent,
    AdminAuthorEditComponent,
    UserHomeComponent,
    UserDocumentNewComponent,
    ToolSelectAuthorComponent,
    UiUserToolHeaderComponent,
    ToolSelectPathComponent,
    ToolSelectDocumentsNotReadyComponent,
    ToolDisplaySelectedDocumentComponent,
    ToolDisplaySelectedDocumentHistoryComponent,
    ToolSelectDocumentsNotAssignedComponent,
    ToolSelectDocumentsAssignedComponent

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
    IsAuthenticatedGuard,
    PendingChangesGuard,
    GlobalFunctionsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
