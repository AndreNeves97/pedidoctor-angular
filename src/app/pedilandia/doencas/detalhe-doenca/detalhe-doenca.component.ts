import { Component, OnInit } from '@angular/core';
import { Doenca } from '../doenca.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DoencaService } from '../doenca.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe-doenca',
  templateUrl: './detalhe-doenca.component.html',
  styleUrls: ['./detalhe-doenca.component.scss']
})
export class DetalheDoencaComponent implements OnInit {

  private doenca: Doenca = new Doenca();

  constructor(
    private route       : ActivatedRoute,
    private router      : Router,
    private service     : DoencaService
  ) {

    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'))
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((doenca: Doenca) => {
            if ( !doenca ) this.navigate_back();
            else this.doenca = doenca;
          })
        })
  }

  ngOnInit() {
    this.doenca = new Doenca();
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/doenca'])
  }

}
