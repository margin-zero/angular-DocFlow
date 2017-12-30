import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';


import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { BackendApiService } from './services/backend-api/backend-api.service';
import { IsAdminGuard, IsUserGuard } from './services/router-guards/router-guards.service';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminGrouplistComponent } from './components/admin-grouplist/admin-grouplist.component';
import { AdminPathlistComponent } from './components/admin-pathlist/admin-pathlist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    AdminComponent,
    UserComponent,
    AdminUserlistComponent,
    AdminGrouplistComponent,
    AdminPathlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, BackendApiService, IsAdminGuard, IsUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
