import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminGrouplistComponent } from './components/admin-grouplist/admin-grouplist.component';
import { AdminPathlistComponent } from './components/admin-pathlist/admin-pathlist.component';

import { UserComponent } from './components/user/user.component';


import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './services/authentication/authentication.service';
import { BackendApiService } from './services/backend-api/backend-api.service';
import { UserService } from './services/user/user.service';

import { IsAdminGuard, IsUserGuard } from './services/router-guards/router-guards.service';
import { PendingChangesGuard } from './services/router-guards/router-guards.service';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { AdminUserResetpasswordComponent } from './components/admin-user-resetpassword/admin-user-resetpassword.component';




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
    AdminUserResetpasswordComponent
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
    UserService,
    IsAdminGuard,
    IsUserGuard,
    PendingChangesGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
