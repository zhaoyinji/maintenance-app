import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: User = {};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getSessionInfo().subscribe(
      (session: any) => {
        if (session != null) {
          const payload = session.getIdToken().decodePayload();
          console.log('payload:', payload['email']);
          this.user.email = payload['email'];
          this.user.username = payload['cognito:username'];
        }
      }
    );
  }

}
