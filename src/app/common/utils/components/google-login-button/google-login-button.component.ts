import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.scss']
})
export class GoogleLoginButtonComponent implements OnInit {

  
    constructor(
        private auth: AuthService,
    ) { }

    ngOnInit() {
    }

    async login() {
        this.auth.signInWithGoogle();
    }
}
