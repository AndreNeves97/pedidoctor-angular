import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../common/security/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUsuarioStatus } from '../common/security/usuario.model';

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
        private router: Router
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
    }

    async login() {
        this.loading = true;

        const { email, senha } = this.form.value;

        let msg = '';
        let success: boolean = false;

        try {
            // const credential = await this.firebaseService.singInWithEmailAndPassword(email, senha);

            // const idToken = await credential.user.getIdToken();
            // const user = await this.authService.validateFirebaseLogin(idToken);

            // this.authService.usuarioLogado = user;

            // msg = 'Usuário logado com sucesso!';
            // success = true;

            // if(user.roles.includes('colaborador'))
            //     this.router.navigate(['/admin']);
            // else
            //     this.router.navigate(['/cliente']);


        } catch (e) {
            if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
                msg = 'E-mail ou senha incorreta.'
            } else {
                msg = 'Ocorreu um erro, tente novamente';
            }
            success = false;
        }

        // this.alertDialogService.openDialog(
        //     'Login',
        //     msg
        // );

        this.loading = false;

    }

}
