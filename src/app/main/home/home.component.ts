import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private auth : AuthService
    ) { }

    async login() {
        let a = await this.auth.signInWithGoogle();
        console.log(a);
    }
    
    logout() {
        this.auth.signOut();
    }

    ngOnInit() { }

}
