import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { User } from './user.model';

const POOL_DATA = {
  UserPoolId: 'eu-central-1_2PpE9CluY',
  ClientId: '29i2uq6cl9lpiq6acjjtqca5ps'
};

const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  unconfirmedUser = new BehaviorSubject<CognitoUser>(null);
  errorMessage = new BehaviorSubject<string>('');
  actionSucceed = new BehaviorSubject<boolean>(false);
  isSuperAdmin = new BehaviorSubject<boolean>(false);
  registeredUser: CognitoUser;

  constructor(
    private router: Router,
    private http: Http) {}

  signUp(username: string, email: string, password: string): void {
    this.authIsLoading.next(true);
    const user: User = {
      username: username,
      email: email,
      password: password
    };
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
      if (err) {
        this.onAuthFailed(err);
        return;
      }
      this.onSuccess();
      this.registeredUser = result.user;
    });
  }

  onAuthFailed(err: Error) {
    this.authDidFail.next(true);
    this.errorMessage.next(err.message);
    this.authIsLoading.next(false);
  }

  onAuthSuccess() {
    this.authStatusChanged.next(true);
    this.onSuccess();
  }

  onSuccess() {
    this.authDidFail.next(false);
    this.authIsLoading.next(false);
  }

  confirmUser(username: string, code: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        this.onAuthFailed(err);
        return;
      }
      this.onSuccess();
      this.router.navigate(['/']);
    });
  }

  changePassword(newPassword: string, cognitoUser: CognitoUser) {
    this.authIsLoading.next(true);
    const _this = this;
    cognitoUser.completeNewPasswordChallenge(newPassword, [], {
      onSuccess(result: CognitoUserSession) {
        _this.onAuthSuccess();
      },
      onFailure(err) {
        _this.onAuthFailed(err);
      }
    });
  }

  signIn(username: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const _this = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result: CognitoUserSession) {
        _this.onAuthSuccess();
      },
      onFailure(err) {
        _this.onAuthFailed(err);
      },
      mfaRequired(codeDeliveryDetails) {
        // MFA is required to complete user authentication. 
        // Get the code from user and call 
        // Not implemented yet
        console.error('need mfa');
      },
      newPasswordRequired(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new 
        // password and required attributes, if any, to complete 
        // authentication.

        // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
        // Required attributes according to schema, which don’t have any values yet, will have blank values.
        // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

        
        // Get these details and call 
        // newPassword: password that user has given
        // attributesData: object with key as attribute name and value that the user has given.
        _this.unconfirmedUser.next(cognitoUser);
        _this.router.navigate(['/force-change-password']);
      }
    });
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
    this.isSuperAdmin.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
              const payload = session.getIdToken().decodePayload();
              const groups: string[] = payload['cognito:groups'];
              const superAdmin = groups !== undefined && groups.find((group) => group === 'SuperAdmin');
              if (superAdmin) {
                this.isSuperAdmin.next(true);
              } else {
                this.isSuperAdmin.next(false);
              }
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
  
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }

  getSessionInfo(): Observable<any> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(null);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(null);
          } else {
            if (session.isValid()) {
              observer.next(session);
            } else {
              observer.next(null);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
}
