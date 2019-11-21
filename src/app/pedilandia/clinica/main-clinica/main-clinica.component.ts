import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
    selector: 'app-main-clinica',
    templateUrl: './main-clinica.component.html',
    styleUrls: ['./main-clinica.component.scss']
})
export class MainClinicaComponent implements OnInit {

    constructor(
        private router: Router,
        private authService : AuthService
    ) { }

    ngOnInit() { }

}

