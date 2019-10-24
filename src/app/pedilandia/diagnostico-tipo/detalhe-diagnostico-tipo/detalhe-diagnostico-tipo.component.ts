import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DiagnosticoTipo } from '../diagnostico-tipo.model';
import { DiagnosticoTipoService } from '../diagnostico-tipo.service';

@Component({
  selector: 'app-detalhe-diagnostico-tipo',
  templateUrl: './detalhe-diagnostico-tipo.component.html',
  styleUrls: ['./detalhe-diagnostico-tipo.component.scss']
})
export class DetalheDiagnosticoTipoComponent implements OnInit {

    private obj: DiagnosticoTipo = new DiagnosticoTipo("", "") ;

    constructor(
      private route:   ActivatedRoute,
      private router:  Router,
      private service: DiagnosticoTipoService,
    ) { 
  
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((obj: DiagnosticoTipo) => {
            if ( !obj ) this.navigate_back();
            else this.obj = obj;
          })
        });
  
    }
      
    ngOnInit() {
      this.obj = new DiagnosticoTipo();
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-diagnostico']);
    }

}
