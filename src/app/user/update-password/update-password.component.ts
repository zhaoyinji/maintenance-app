import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

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
    this.isSending = true;
    this.authService.updatePassword(this.form.value.oldPassword, this.form.value.password);
  }
}
