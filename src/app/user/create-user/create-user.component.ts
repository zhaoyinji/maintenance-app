import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  errorMessage = '';
  actionSucceed = false;
  isSending = false;
  @ViewChild('usrForm') form: NgForm;

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
        this.form.resetForm();
      }
    );
  }

  onSubmit() {
    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      name: this.form.value.name,
      userType: this.form.value.userType
    }
    this.isSending = true;
    this.userService.createUser(user);
  }
}
