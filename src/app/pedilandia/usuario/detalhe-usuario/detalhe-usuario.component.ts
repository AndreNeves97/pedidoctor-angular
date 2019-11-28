import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from 'src/app/common/security/usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
    selector: 'app-detalhe-usuario',
    templateUrl: './detalhe-usuario.component.html',
    styleUrls: ['./detalhe-usuario.component.scss']
})
export class DetalheUsuarioComponent implements OnInit {

    private obj: Usuario;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UsuarioService,
    ) {
        this.obj = null;

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return of(params.get('id'));
                })
            )
            .subscribe((id: string) => {
                this.obj = null;

                this.service.getUser(id).then((obj: Usuario) => {
                    if (!obj) this.navigate_back();
                    else this.obj = obj;
                })
            });

    }

    ngOnInit() {
    }

    navigate_back() {
        history.back();
    }
    
    editar() {
        this.router.navigate(['/pedilandia/usuarios/editar', this.obj._id])
    }
}
