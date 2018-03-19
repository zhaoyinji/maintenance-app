import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-force-change-password',
  templateUrl: './force-change-password.component.html',
  styleUrls: ['./force-change-password.component.css']
})
export class ForceChangePasswordComponent implements OnInit {
  @ViewChild('usrForm') form: NgForm;
  cognitoUser: CognitoUser;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.unconfirmedUser.subscribe(
      (cognitoUser: CognitoUser) => {
        this.cognitoUser = cognitoUser;
    });
    this.authService.errorMessage.subscribe(
      (errorMessage: string) => this.errorMessage = errorMessage
    );
  }

  onSubmit() {
    const password = this.form.value.password;
    
    this.authService.forceChangePassword(password, this.cognitoUser);
  }
}
