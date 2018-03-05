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
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    SigninComponent,
    ChangePasswordComponent,
    UpdateProfileComponent
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
