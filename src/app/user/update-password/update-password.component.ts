import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BaseForm } from '../../share/BaseForm';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends BaseForm implements OnInit {
  @ViewChild('usrForm') form: NgForm;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.authService.isLoading.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.authService.errorMessage.subscribe((errorMessage: string) => this.errorMessage = errorMessage);
    this.authService.actionSucceed.subscribe(
      (actionSucceed: boolean) => {
        this.actionSucceed = actionSucceed;
        this.form.resetForm();
      }
    );
  }

  onSubmit() {
    this.authService.updatePassword(this.form.value.oldPassword, this.form.value.password);
  }
}
