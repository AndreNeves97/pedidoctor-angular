import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { ApiService } from '../api.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, FirebaseError } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {

    apiUrl : string = 'http://localhost:3000';
    usuarioLogado : BehaviorSubject<Usuario>;
    

    constructor(
        private afAuth: AngularFireAuth,
        private http: HttpClient
    ) {
        this.usuarioLogado = new BehaviorSubject<Usuario>(null);
        this.afAuth.user.subscribe( user => this.newFirebaseUser(user) );
    }

    async newFirebaseUser(user : firebase.User) {
        if(user == null) {
            this.setUsuarioLogado(null);
            return;
        }
        
        const idToken = await user.getIdToken();
        const usuarioLogado = await this.validateFirebaseLogin(idToken);
        this.setUsuarioLogado(usuarioLogado);
    }

    private setUsuarioLogado(user : Usuario) {

        if(user != null)
            console.log('jwt', user.jwt);
        
        this.usuarioLogado.next(user);
    }

    async signInWithGoogle() {
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    async signOut() {
        this.afAuth.auth.signOut();
    }

    getFirebaseUser() : Observable<firebase.User> {
        return this.afAuth.user;
    }

    async validateFirebaseLogin(idToken : string) : Promise<Usuario> {
        const res : any = await this.http.post(
            `${this.apiUrl}/login`, 
            {
                'idToken': idToken
            }
        ).toPromise();

        const user = new Usuario({
            nome: res.user.nome,
            email: res.user.email,
            fotoUrl: res.user.fotoUrl,
            jwt: res.jwt,
            telefone: null
        });

        return user;
  }

}
