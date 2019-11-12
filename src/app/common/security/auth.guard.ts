import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginUsuarioStatus } from './usuario.model';
import { LoadingDialogService } from '../utils/components/loading-dialog/loading-dialog.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router : Router,
        private authService : AuthService,
        private loadingDialogService : LoadingDialogService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
        const usuario = this.authService.usuarioLogado.value;


        if(usuario.status == LoginUsuarioStatus.DESLOGADO) {
            return this.router.createUrlTree(['/login']);
        } else if(usuario.status == LoginUsuarioStatus.LOGADO) {
            return true;
        } else {
            const loadingDialog = this.loadingDialogService.show();
            let subscription;

            const okFn = () => {
                subscription.unsubscribe();
                loadingDialog.close()
            }
                        

            return new Promise<boolean | UrlTree>(async (res, rej) => {

                subscription = this.authService.usuarioLogado.subscribe(novoUsuario => {
                    

                    if(novoUsuario.status == LoginUsuarioStatus.DESLOGADO) {
                        okFn()
                        res(this.router.createUrlTree(['/login']));
                    } else if(novoUsuario.status == LoginUsuarioStatus.LOGADO) {
                        okFn()
                        res(true);
                    }
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
