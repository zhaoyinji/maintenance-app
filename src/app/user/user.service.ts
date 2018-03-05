import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  errorMessage = new BehaviorSubject<string>('');
  actionSucceed = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: Http) {}

  createUser(username: string, email: string, name: string, userType: string): void {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const userData = {
        username,
        email,
        name,
        userType
      };
     
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      this.http.post(environment.apiUrl + '/users' + queryParam, userData, {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
      .map(
        (response: Response) => response.json()
      )
      .subscribe(
        (data) => {
          if (data.errorMessage) {
            this.errorMessage.next(data.errorMessage);
            this.actionSucceed.next(false);
          } else {
            this.actionSucceed.next(true);
          }
        },
        (error) => {
          this.errorMessage.next(error.errorMessage);
        }
      );
    });
  }
}
