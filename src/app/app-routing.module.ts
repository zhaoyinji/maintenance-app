import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './user/signin/signin.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'create-user', canActivate: [AuthGuard], component: CreateUserComponent },
  { path: 'update-profile', canActivate: [AuthGuard], component: UpdateProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
