import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  errorMessage = '';
  actionSucceed = false;
  isSending = false;
  @ViewChild('usrForm') form: NgForm;
  user: User = {};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.errorMessage.subscribe(
      (errorMessage: string) => {
        this.isSending = false;
        this.errorMessage = errorMessage;
      }
    );
    this.userService.actionSucceed.subscribe(
      (actionSucceed: boolean) => {
        this.isSending = false;
        this.actionSucceed = actionSucceed;
      }
    );
    this.userService.getUserProfile();
    this.userService.user.subscribe(user => this.user = user);
  }

  onSubmit() {
    this.isSending = true;
    const inputUser: User = {
      username: this.user.username,
      email: this.user.email,
      name: this.form.value.name,
      userType: this.user.userType
    }
    this.userService.updateUserProfile(inputUser);
  }
}
