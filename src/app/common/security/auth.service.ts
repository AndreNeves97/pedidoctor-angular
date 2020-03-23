import { Injectable } from '@angular/core';
import { Usuario, UsuarioLogadoModel, LoginUsuarioStatus } from './usuario.model';
import { ApiService } from '../api.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, FirebaseError } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, Route } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl: string = 'http://localhost:3000';

    usuarioLogado: BehaviorSubject<UsuarioLogadoModel>;


    constructor(
        private afAuth: AngularFireAuth,
        private http: HttpClient,
        private router: Router
    ) {
        const usuarioLogadoDefault = {
            status: LoginUsuarioStatus.UNDEFINED,
            usuario: null
        };
        this.usuarioLogado = new BehaviorSubject<UsuarioLogadoModel>(usuarioLogadoDefault);


        this.afAuth.user.subscribe(user => this.newFirebaseUser(user));

        this.usuarioLogado.subscribe(v => {
            if (v.status === LoginUsuarioStatus.DESLOGADO) {
                this.router.navigate(['login']);
            }
        });
    }

    async newFirebaseUser(user: firebase.User) {

        if (user == null) {
            this.setUsuarioLogado(null);
            return;
        }

        this.usuarioLogado.next({
            status: LoginUsuarioStatus.VALIDANDO,
            usuario: null
        });

        const idToken = await user.getIdToken();
        const usuarioLogado = await this.validateFirebaseLogin(idToken);
        this.setUsuarioLogado(usuarioLogado);

    }

    private setUsuarioLogado(usuario: Usuario) {
        let status: LoginUsuarioStatus = LoginUsuarioStatus.DESLOGADO;

        if (usuario != null) {
            status = LoginUsuarioStatus.LOGADO;
        }

        this.usuarioLogado.next({
            status,
            usuario
        });
    }

    async signInWithGoogle() {
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    async signOut() {

        if(this.afAuth.auth.currentUser != null) {
            this.afAuth.auth.signOut();
        } else {
            this.usuarioLogado.next({
                status: LoginUsuarioStatus.DESLOGADO,
                usuario: null
            });
        }
    }

    getFirebaseUser(): Observable<firebase.User> {
        return this.afAuth.user;
    }

    async validateFirebaseLogin(idToken: string): Promise<Usuario> {
        const res: any = await this.http.post(
            `${this.apiUrl}/login`,
            {
                'idToken': idToken
            }
        ).toPromise();

        const user = new Usuario({
            _id: res.user._id,
            nome: res.user.nome,
            email: res.user.email,
            fotoUrl: res.user.fotoUrl,
            roles: res.user.roles,
            atribuicoes: res.user.atribuicoes,
            jwt: res.jwt,
            isPaciente: res.user.isPaciente,
            telefone: null,
            tipo: 0,
            qtConsultas: 0,
        });

        return user;
    }


    async loginWithEmailAndPass(email: string, pass: string) {
        const res: any = await this.http.post(
            `${this.apiUrl}/login-email`,
            {
                'email': email,
                'pass': pass,
            }
        ).toPromise();

        const user = new Usuario({
            _id: res.user._id,
            nome: res.user.nome,
            email: res.user.email,
            fotoUrl: res.user.fotoUrl,
            roles: res.user.roles,
            atribuicoes: res.user.atribuicoes,
            isPaciente: res.user.isPaciente,
            jwt: res.jwt,
            telefone: null,
            tipo: 0,
            qtConsultas: 0,
        });


        this.setUsuarioLogado(user);
    }


}
