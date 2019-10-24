import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExameTipo } from '../exame-tipo.model';
import { ExameTipoService } from '../exame-tipo.service';

@Component({
  selector: 'app-detalhe-exame-tipo',
  templateUrl: './detalhe-exame-tipo.component.html',
  styleUrls: ['./detalhe-exame-tipo.component.scss']
})
export class DetalheExameTipoComponent implements OnInit {

    private obj: ExameTipo = new ExameTipo("", "") ;

    constructor(
      private route:   ActivatedRoute,
      private router:  Router,
      private service: ExameTipoService,
    ) { 
  
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((obj: ExameTipo) => {
            if ( !obj ) this.navigate_back();
            else this.obj = obj;
          })
        });
  
    }
      
    ngOnInit() {
      this.obj = new ExameTipo();
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-exame']);
    }


}
