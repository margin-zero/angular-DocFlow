import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';



import { AppRoutingModule }     from './app-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { BackendApiService } from './services/backend-api/backend-api.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
