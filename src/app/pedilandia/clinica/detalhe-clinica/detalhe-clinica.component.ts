import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClinicaService } from '../clinica.service';
import { switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/common/security/auth.service';
import { Usuario } from 'src/app/common/security/usuario.model';

@Component({
    selector: 'app-detalhe-clinica',
    templateUrl: './detalhe-clinica.component.html',
    styleUrls: ['./detalhe-clinica.component.scss']
})
export class DetalheClinicaComponent implements OnInit {

    private clinica: Clinica;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ClinicaService,
        private authService : AuthService,
        private changeDetectorRef : ChangeDetectorRef
    ) {
        this.clinica = null;

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return of(params.get('id'));
                })
            )
            .subscribe((id: string) => {
                this.getClinica(id)
            });

    }

    ngOnInit() {
    }

    navigate_back() {
        this.router.navigate(['/pedilandia/clinica']);
    }

    update($event) {
        this.getClinica($event);
    }

    getClinica(id) {
        
        this.clinica = null;


        this.service.find(id).then((clinica: Clinica) => {
            if (!clinica) this.navigate_back();
            else  {
                this.clinica = clinica;
                this.changeDetectorRef.detectChanges();
            }


        })
    }


    getContent(index: number) {
        return `Conteúdo para a aba ${index}`;
    }

    haveAccess(usuario : Usuario, aba : string) {
        
        let cond = usuario.roles.includes('admin');

        if(['consultas', 'clientes', 'gerentes', 'secretarios'].includes(aba))
            cond = 
                usuario.atribuicoes.medico.includes(this.clinica._id) || 
                usuario.atribuicoes.gerente.includes(this.clinica._id) || 
                usuario.atribuicoes.secretario.includes(this.clinica._id) ||
                cond;
        
        if(aba == 'medicos')
            cond = true;

        return cond;
    }
}
