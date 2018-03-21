import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { BaseForm } from '../../share/BaseForm';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends BaseForm implements OnInit {
  @ViewChild('usrForm') form: NgForm;

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.userService.isLoading.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.userService.errorMessage.subscribe((errorMessage: string) => this.errorMessage = errorMessage);
    this.userService.actionSucceed.subscribe(
      (actionSucceed: boolean) => {
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
    this.userService.createUser(user);
  }
}
