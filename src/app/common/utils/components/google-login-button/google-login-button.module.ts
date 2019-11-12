import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginButtonComponent } from './google-login-button.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [GoogleLoginButtonComponent],
    exports: [GoogleLoginButtonComponent],
    imports: [
        CommonModule,

        MatButtonModule,
    ]
})
export class GoogleLoginButtonModule { }
