import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginUsuarioStatus } from './usuario.model';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router : Router,
        private authService : AuthService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
        const usuario = this.authService.usuarioLogado.value;


        console.log('PEDILANDIA', usuario);

        if(usuario.status == LoginUsuarioStatus.DESLOGADO) {
            this.router.navigate(['/'])
            return false;
        } else if(usuario.status == LoginUsuarioStatus.LOGADO) {
            return true;
        } else {
            console.log('esperar');

            return new Promise<boolean | UrlTree>(async (res, rej) => {
                let subscription;
                
                subscription = this.authService.usuarioLogado.subscribe(novoUsuario => {

                    if(novoUsuario.status == LoginUsuarioStatus.DESLOGADO) {
                        subscription.unsubscribe();

                        this.router.navigate(['/'])
                        res(false);
                    } else if(novoUsuario.status == LoginUsuarioStatus.LOGADO) {
                        subscription.unsubscribe();
                        
                        res(true);
                    }
                    console.log(subscription)
                    console.log(novoUsuario)
                });


            
            });

            // setTimeout(() => subject.next(
            //     true
            // ), 1000)
        }

        return false;
    }

    async asyncValidation() {
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            console.log('qaaaa')
        return false;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
            console.log('qaaaa')
        return false;
    }
}
