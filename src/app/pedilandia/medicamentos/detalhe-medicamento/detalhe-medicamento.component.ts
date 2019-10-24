import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../medicamento.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MedicamentoService } from '../medicamento.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe-medicamento',
  templateUrl: './detalhe-medicamento.component.html',
  styleUrls: ['./detalhe-medicamento.component.scss']
})
export class DetalheMedicamentoComponent implements OnInit {

  private medicamento: Medicamento = new Medicamento();

  constructor(
    private route       : ActivatedRoute,
    private router      : Router,
    private service     : MedicamentoService
  ) { 

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        })
      )
      .subscribe((id: string) => {
        this.service.find(id).then((medicamento: Medicamento) => {
          if ( !medicamento ) this.navigate_back();
          else this.medicamento = medicamento;
        })
      })

  }

  ngOnInit() {
    this.medicamento = new Medicamento();
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/medicamento'])
  }

}
