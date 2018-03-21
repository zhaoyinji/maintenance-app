import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { BaseForm } from '../../share/BaseForm';

@Component({
  selector: 'app-force-change-password',
  templateUrl: './force-change-password.component.html',
  styleUrls: ['./force-change-password.component.css']
})
export class ForceChangePasswordComponent extends BaseForm implements OnInit {
  @ViewChild('usrForm') form: NgForm;
  cognitoUser: CognitoUser;

  constructor(private authService: AuthService) { 
    super();
  }

  ngOnInit() {
    this.authService.isLoading.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.authService.unconfirmedUser.subscribe((cognitoUser: CognitoUser) => this.cognitoUser = cognitoUser);
    this.authService.errorMessage.subscribe((errorMessage: string) => this.errorMessage = errorMessage);
  }

  onSubmit() {
    const password = this.form.value.password;
    this.authService.forceChangePassword(password, this.cognitoUser);
  }
}
