import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  confirmUser = false;
  errorMessage = '';
  actionSucceed = false;
  isSending = false;
  @ViewChild('usrForm') form: NgForm;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.errorMessage.subscribe(
      (errorMessage: string) => {
        this.isSending = false;
        this.errorMessage = errorMessage;
      }
    );
    this.authService.actionSucceed.subscribe(
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
    this.authService.createUser(usrName, email, name, userType);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string, validationCode: string }) {
    this.authService.confirmUser(formValue.usrName, formValue.validationCode);
  }
}
