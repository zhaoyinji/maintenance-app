import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { SigninComponent } from './user/signin/signin.component';
import { CompareComponent } from './compare/compare.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/auth.service';
import { CompareService } from './compare/compare.service';
import { CompareInputComponent } from './compare/compare-input/compare-input.component';
import { CompareResultsComponent } from './compare/compare-results/compare-results.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    SigninComponent,
    CompareComponent,
    CompareInputComponent,
    CompareResultsComponent,
    ChangePasswordComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, CompareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
