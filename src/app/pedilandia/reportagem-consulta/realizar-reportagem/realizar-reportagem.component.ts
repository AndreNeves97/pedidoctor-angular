import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consulta } from '../../consulta/consulta.model';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import { switchMap, filter, pairwise } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConsultaService } from '../../consulta/consulta.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { ReportagemConsulta } from './reportagem-consulta.model';
import { Diagnostico } from '../../diagnostico/diagnostico.model';

@Component({
  selector: 'app-realizar-reportagem',
  templateUrl: './realizar-reportagem.component.html',
  styleUrls: ['./realizar-reportagem.component.scss']
})
export class RealizarReportagemComponent implements OnInit {

  private primeiro_form_group : FormGroup;
  private segundo_form_group  : FormGroup;
  private terceiro_form_group : FormGroup;

  private descricao_consulta  : string;

  private consulta            : Consulta;

  constructor(
    private form_builder      : FormBuilder,
    private router            : Router,
    private service           : ConsultaService,
    private route             : ActivatedRoute,
    private snack_bar_service : SnackService
  ) {
    this.init_forms();

    // console.log('http://localhost:4200/pedilandia/realizar-consulta/5dc846471cecf915ba77f0dd');

    this.consulta = null;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return of(params.get('id'));
      })
    ).subscribe((id: string) => {
      this.consulta = null;

      this.service.find(id).then((consulta: Consulta) => {
        if ( consulta ) this.consulta = consulta;
        else {
          this.snack_bar_service.open_snack_bar(
            'Consulta não encontrada. Algo deu errado.',
            'warn', 5
          );
          this.navigate_back();
        }
      })
    });

  }

  ngOnInit() { 
  }

  private init_forms() {

    this.primeiro_form_group = this.form_builder.group({
        descricao : [
          this.descricao_consulta,
          Validators.required
        ]
    });

    this.segundo_form_group = this.form_builder.group({

    });

    this.terceiro_form_group = this.form_builder.group({

    });

  }

  private navigate_back() {
    this.router.events.pipe(
      filter((event: any) => event instanceof RoutesRecognized), pairwise()
    ).subscribe((events: RoutesRecognized[]) => {
      console.log(events[0].urlAfterRedirects);
    })
  }

}
