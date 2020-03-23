import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../common/security/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUsuarioStatus } from '../common/security/usuario.model';
import { DialogService } from '../common/utils/dialog/dialog.service';
import { MessageDialogService } from '../common/utils/components/message-dialog/message-dialog.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading: boolean;

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private messageDialog : MessageDialogService
    ) {
        this.form = fb.group({
            email: [
                "",
                Validators.compose([
                    Validators.required, Validators.email
                ])
            ],


            senha: [
                "",
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6)
                ])
            ],
        });
    }

    ngOnInit() {
        let subscription : Subscription;
        
        subscription = this.auth.usuarioLogado.subscribe((v) => {
            if(v.status == LoginUsuarioStatus.LOGADO) {
                subscription.unsubscribe();
                this.router.navigate(['pedilandia']);
            }
        });
    }

    async login() {
        this.loading = true;

        const { email, senha } = this.form.value;

        let msg = '';
        let success: boolean = false;


        try {

            await this.auth.loginWithEmailAndPass(email, senha);

            success = true;


        } catch (e) {

            if (e.status == 401) {
                msg = 'E-mail ou senha incorreta.'
            } else {
                msg = 'Ocorreu um erro, tente novamente';
            }
            success = false;
        }

        if(success == false)
            this.messageDialog.openDialog('Login', msg);

        this.loading = false;

    }

    async googleLogin() {

        await this.auth.signInWithGoogle();
        this.loading = true;


    }
}
