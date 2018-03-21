import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { BaseForm } from '../../share/BaseForm';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BaseForm implements OnInit {
  @ViewChild('usrForm') form: NgForm;
  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.authService.isLoading.subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this.authService.errorMessage.subscribe((errorMessage: string) => this.errorMessage = errorMessage);
  }

  onSubmit() {
    const usrName = this.form.value.username;
    const password = this.form.value.password;
    this.authService.signIn(usrName, password);
  }
}
