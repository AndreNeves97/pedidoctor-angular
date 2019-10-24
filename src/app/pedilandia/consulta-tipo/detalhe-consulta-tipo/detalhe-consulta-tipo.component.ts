import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClinicaService } from '../../clinica/clinica.service';
import { ConsultaTipo } from '../consulta-tipo.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConsultaTipoService } from '../consulta-tipo.service';

@Component({
  selector: 'app-detalhe-consulta-tipo',
  templateUrl: './detalhe-consulta-tipo.component.html',
  styleUrls: ['./detalhe-consulta-tipo.component.scss']
})
export class DetalheConsultaTipoComponent implements OnInit {

    private obj: ConsultaTipo = new ConsultaTipo("", "") ;

    constructor(
      private route:   ActivatedRoute,
      private router:  Router,
      private service: ConsultaTipoService,
    ) { 
  
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((obj: ConsultaTipo) => {
            if ( !obj ) this.navigate_back();
            else this.obj = obj;
          })
        });
  
    }
      
    ngOnInit() {
      this.obj = new ConsultaTipo();
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-consulta']);
    }
}
