import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { SigninComponent } from './user/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { ForceChangePasswordComponent } from './user/force-change-password/force-change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    SigninComponent,
    ForceChangePasswordComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
