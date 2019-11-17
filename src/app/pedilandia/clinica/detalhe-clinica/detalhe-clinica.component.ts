import { Component, OnInit } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClinicaService } from '../clinica.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    ) {
        this.clinica = null;

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return of(params.get('id'));
                })
            )
            .subscribe((id: string) => {
                this.clinica = null;

                this.service.find(id).then((clinica: Clinica) => {
                    if (!clinica) this.navigate_back();
                    else this.clinica = clinica;
                })
            });

    }

    ngOnInit() {
    }

    navigate_back() {
        this.router.navigate(['/pedilandia/clinica']);
    }



    getContent(index: number) {
        return `Conteúdo para a aba ${index}`;
    }
}
