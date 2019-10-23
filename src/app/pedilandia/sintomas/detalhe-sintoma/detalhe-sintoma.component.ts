import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SintomaService } from '../sintoma.service';
import { Sintoma } from '../sintoma.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe-sintoma',
  templateUrl: './detalhe-sintoma.component.html',
  styleUrls: ['./detalhe-sintoma.component.scss']
})
export class DetalheSintomaComponent implements OnInit {

  private sintoma: Sintoma = new Sintoma();

  constructor(
    private route:    ActivatedRoute,
    private router:   Router,
    private service:  SintomaService
  ) { 

    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'))
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((sintoma: Sintoma) => {
            if( !sintoma ) this.navigate_back();
            else this.sintoma = sintoma;
          })
        })

  }

  ngOnInit() {
    this.sintoma = new Sintoma();
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/sintoma']);
  }

}
