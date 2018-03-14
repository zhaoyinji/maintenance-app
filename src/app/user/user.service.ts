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
  user = new Subject<User>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: Http) {}

  createUser(user: User): void {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const userData = {
        username: user.username,
        email: user.email,
        name: user.name,
        userType: user.userType
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

  getUserProfile(): void {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      this.http.get(environment.apiUrl + '/users/my-profile' + queryParam, {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
      .map(
        (response: Response) => response.json()
      )
      .subscribe(
        (data) => {
          if (data.errorMessage) {
            this.errorMessage.next(data.errorMessage);
          } else {
            const payload = session.getIdToken().decodePayload();
            const userProfile: User = {
              email: payload['email'],
              username: payload['cognito:username'],
              name: data.name,
              userType: data.userType
            }
            this.user.next(userProfile);
          }
        },
        (error) => {
          this.errorMessage.next(error.errorMessage);
        }
      );
    });
  }

  updateUserProfile(user: User): void {
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const userData = {
        name: user.name,
        userType: user.userType
      };
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      this.http.put(environment.apiUrl + '/users/my-profile' + queryParam, userData, {
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
