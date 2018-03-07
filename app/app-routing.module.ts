import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { AdminComponent } from './components/admin/admin.component';
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
import { AdminPathNewComponent } from './components/admin-path-new/admin-path-new.component';
import { AdminPathViewComponent } from './components/admin-path-view/admin-path-view.component';
import { AdminPathEditComponent } from './components/admin-path-edit/admin-path-edit.component';
import { AdminPathDeleteComponent } from './components/admin-path-delete/admin-path-delete.component';

import { AdminPathstepNewComponent } from './components/admin-pathstep-new/admin-pathstep-new.component';
import { AdminPathstepEditComponent } from './components/admin-pathstep-edit/admin-pathstep-edit.component';
import { AdminPathstepGroupsDeleteComponent } from './components/admin-pathstep-groups-delete/admin-pathstep-groups-delete.component';
import { AdminPathstepDeleteComponent } from './components/admin-pathstep-delete/admin-pathstep-delete.component';

import { AdminActionlistComponent } from './components/admin-actionlist/admin-actionlist.component';
import { AdminActionNewComponent } from './components/admin-action-new/admin-action-new.component';
import { AdminActionViewComponent } from './components/admin-action-view/admin-action-view.component';
import { AdminActionDeleteComponent } from './components/admin-action-delete/admin-action-delete.component';
import { AdminActionEditComponent } from './components/admin-action-edit/admin-action-edit.component';

import { AdminAuthorlistComponent } from './components/admin-authorlist/admin-authorlist.component';
import { AdminAuthorNewComponent } from './components/admin-author-new/admin-author-new.component';
import { AdminAuthorViewComponent } from './components/admin-author-view/admin-author-view.component';
import { AdminAuthorEditComponent } from './components/admin-author-edit/admin-author-edit.component';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';

import { UserComponent } from './components/user/user.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { IsAdminGuard, IsUserGuard, IsAuthenticatedGuard, PendingChangesGuard } from './services/router-guards/router-guards.service';
import { AdminUserGroupsDeleteComponent } from './components/admin-user-groups-delete/admin-user-groups-delete.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'changepassword', component: ChangePasswordComponent, canActivate: [IsAuthenticatedGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard],
        children: [
          { path: 'home', component: AdminHomeComponent },

          { path: 'user', component: AdminUserlistComponent,
              children: [
                { path: 'edit/:userId', component: AdminUserEditComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:userId', component: AdminUserViewComponent },
                { path: 'resetpassword/:userId', component: AdminUserResetpasswordComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'new', component: AdminUserNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'delete/:userId', component: AdminUserDeleteComponent },
                { path: 'deletefromgroup/:userId/:groupId', component: AdminUserGroupsDeleteComponent }
              ] },

          { path: 'group', component: AdminGrouplistComponent,
              children: [
                { path: 'new', component: AdminGroupNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:groupId', component: AdminGroupViewComponent },
                { path: 'delete/:groupId', component: AdminGroupDeleteComponent },
                { path: 'edit/:groupId', component: AdminGroupEditComponent, canDeactivate: [PendingChangesGuard] },
              ] },

          { path: 'path', component: AdminPathlistComponent,
              children: [
                { path: 'new', component: AdminPathNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:pathId', component: AdminPathViewComponent },
                { path: 'edit/:pathId', component: AdminPathEditComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'delete/:pathId', component: AdminPathDeleteComponent },
                { path: 'pathstep/new/:pathId', component: AdminPathstepNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'pathstep/edit/:pathStepId', component: AdminPathstepEditComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'pathstep/deletegroup/:pathStepId/:groupId', component: AdminPathstepGroupsDeleteComponent },
                { path: 'pathstep/delete/:pathStepId', component: AdminPathstepDeleteComponent },
              ] },

          { path: 'action', component: AdminActionlistComponent,
              children: [
                { path: 'new', component: AdminActionNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:actionId', component: AdminActionViewComponent },
                { path: 'delete/:actionId', component: AdminActionDeleteComponent },
                { path: 'edit/:actionId', component: AdminActionEditComponent, canDeactivate: [PendingChangesGuard] },
              ] },

          { path: 'author', component: AdminAuthorlistComponent,
              children: [
                { path: 'new', component: AdminAuthorNewComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:authorId', component: AdminAuthorViewComponent },
                { path: 'delete/:actionId', component: AdminActionDeleteComponent },
                { path: 'edit/:authorId', component: AdminAuthorEditComponent, canDeactivate: [PendingChangesGuard] },
              ] },

        ]
    },

    { path: 'user', component: UserComponent, canActivate: [IsUserGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
