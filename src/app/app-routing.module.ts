import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './user/signin/signin.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ForceChangePasswordComponent } from './user/force-change-password/force-change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'force-change-password', component: ForceChangePasswordComponent },
  { path: 'create-user', canActivate: [AuthGuard], component: CreateUserComponent },
  { path: 'update-profile', canActivate: [AuthGuard], component: UpdateProfileComponent },
  { path: 'update-password', canActivate: [AuthGuard], component: UpdatePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
