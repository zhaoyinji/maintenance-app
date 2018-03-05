import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

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
    const usrName = this.form.value.username;
    const email = this.form.value.email;
    const name = this.form.value.name;
    const userType = this.form.value.userType;
    this.isSending = true;
    this.userService.createUser(usrName, email, name, userType);
  }
}
