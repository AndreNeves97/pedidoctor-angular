import { Component, OnInit, ViewChild }                       from '@angular/core';
import { FormBuilder, FormGroup, Validators }                 from '@angular/forms';
import { Consulta }                                           from '../../consulta/consulta.model';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import { switchMap, filter, pairwise }                        from 'rxjs/operators';
import { of }                                                 from 'rxjs';
import { ConsultaService }                                    from '../../consulta/consulta.service';
import { SnackService }                                       from 'src/app/common/utils/snack/snack.service';
import { ReportagemConsultaService }                          from '../reportagem-consulta.service';
import { DiagnosticoConsultaComponent }                       from './diagnostico-consulta/diagnostico-consulta.component';
import { ReceitaConsultaComponent }                           from './receita-consulta/receita-consulta.component';
import { ConfirmacaoConsultaComponent } from './confirmacao-consulta/confirmacao-consulta.component';
import { ReportagemConsulta } from './reportagem-consulta.model';

@Component({
  selector: 'app-realizar-reportagem',
  templateUrl: './realizar-reportagem.component.html',
  styleUrls: ['./realizar-reportagem.component.scss']
})
export class RealizarReportagemComponent implements OnInit {


  @ViewChild(DiagnosticoConsultaComponent, { static: false })
  private diagnostico_comp: DiagnosticoConsultaComponent;

  @ViewChild(ReceitaConsultaComponent, { static: false })
  private receita_comp: ReceitaConsultaComponent;

  @ViewChild(ConfirmacaoConsultaComponent, { static: false })
  private confirmacao_comp: ConfirmacaoConsultaComponent;

  private primeiro_form_group : FormGroup;
  private segundo_form_group  : FormGroup;
  private terceiro_form_group : FormGroup;

  // Propriedades para serem gerenciadas individualmente
  private descricao_consulta  : string;
  private descricao_exames    : string;
  private medicamentos        : any[];

  private consulta            : Consulta;

  constructor(
    private form_builder      : FormBuilder,
    private router            : Router,
    private service           : ConsultaService,
    private route             : ActivatedRoute,
    private snack_bar_service : SnackService,
    private bloc_service      : ReportagemConsultaService
  ) {
    this.init_forms();

    this.consulta = null;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return of(params.get('id'));
      })
    ).subscribe((id: string) => {
      this.consulta = null;
      this.service.find(id).then((consulta: Consulta) => {
        if ( consulta ) {
          this.consulta = consulta;
          if(!consulta.realizacao) 
            consulta.realizacao = new ReportagemConsulta();
          this.bloc_service.update(this.consulta);
          this.bloc_service.set_horario_inicio_now();
        } else {
          this.snack_bar_service.open_snack_bar(
            'Consulta não encontrada. Algo deu errado.',
            'warn', 5
          );
          this.navigate_back();
        }
      })
    });

  }

  ngOnInit() {}

  private init_forms() {

    this.primeiro_form_group = this.form_builder.group({
      descricao : [
        this.descricao_consulta,
        [
          Validators.required
        ]
      ]
    });

    this.segundo_form_group = this.form_builder.group({
      medicamentos: [
        this.medicamentos
      ],
      exames: [
        this.descricao_exames
      ]
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

  public onStepChange(event: any): void {

    if(event.selectedIndex == 1) {
        this.diagnostico_comp.focusDescricaoInput();
    }

    switch(event.previouslySelectedIndex) {
      case 0: {

        break;
      }
      case 1: {
        this.diagnostico_comp.update_bloc_object();
        break;
      }
      case 2: {
        this.receita_comp.update_bloc_object();
        break;
      }
      case 3: {

        break;
      }
    }
  }

  public confirmacao () {
    this.bloc_service.set_horario_final_now();
    this.confirmacao_comp.salvar();
  }

}
