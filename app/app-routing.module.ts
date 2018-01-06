import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './components/login/login.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { AdminUserResetpasswordComponent } from './components/admin-user-resetpassword/admin-user-resetpassword.component';
import { AdminUserNewComponent } from './components/admin-user-new/admin-user-new.component';

import { AdminPathlistComponent } from './components/admin-pathlist/admin-pathlist.component';
import { AdminGrouplistComponent } from './components/admin-grouplist/admin-grouplist.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

import { UserComponent } from './components/user/user.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { IsAdminGuard, IsUserGuard, PendingChangesGuard } from './services/router-guards/router-guards.service';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard],
        children: [
          { path: 'home', component: AdminHomeComponent },
          { path: 'user', component: AdminUserlistComponent,
              children: [
                { path: 'edit/:userId', component: AdminUserEditComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'view/:userId', component: AdminUserViewComponent },
                { path: 'resetpassword/:userId', component: AdminUserResetpasswordComponent, canDeactivate: [PendingChangesGuard] },
                { path: 'new', component: AdminUserNewComponent }
              ] },
          { path: 'pathlist', component: AdminPathlistComponent },
          { path: 'grouplist', component: AdminGrouplistComponent }
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
