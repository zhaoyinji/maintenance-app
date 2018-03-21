import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { BaseForm } from '../../share/BaseForm';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent extends BaseForm implements OnInit {
  @ViewChild('usrForm') form: NgForm;
  user: User = {};

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.userService.isLoading.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.userService.errorMessage.subscribe((errorMessage: string) => this.errorMessage = errorMessage);
    this.userService.actionSucceed.subscribe((actionSucceed: boolean) => this.actionSucceed = actionSucceed);
    this.userService.getUserProfile();
    this.userService.user.subscribe(user => this.user = user);
  }

  onSubmit() {
    const inputUser: User = {
      username: this.user.username,
      email: this.user.email,
      name: this.form.value.name,
      userType: this.user.userType
    }
    this.userService.updateUserProfile(inputUser);
  }
}
