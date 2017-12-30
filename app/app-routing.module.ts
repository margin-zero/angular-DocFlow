import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './components/login/login.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminPathlistComponent } from './components/admin-pathlist/admin-pathlist.component';
import { AdminGrouplistComponent } from './components/admin-grouplist/admin-grouplist.component';


import { UserComponent } from './components/user/user.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { IsAdminGuard, IsUserGuard } from './services/router-guards/router-guards.service';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard],
        children: [
          { path: 'userlist', component: AdminUserlistComponent },
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