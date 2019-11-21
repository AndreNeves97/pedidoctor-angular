import { Component, OnInit, Input } from '@angular/core';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { FormGroup } from '@angular/forms';
import { ReportagemConsultaService } from '../../reportagem-consulta.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConsultaService } from 'src/app/pedilandia/consulta/consulta.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-consulta',
  templateUrl: './confirmacao-consulta.component.html',
  styleUrls: ['./confirmacao-consulta.component.scss']
})
export class ConfirmacaoConsultaComponent implements OnInit {

  private form: FormGroup;

  private _consulta: Consulta;

  constructor(
    private service: ReportagemConsultaService,
    private service_consulta: ConsultaService,
    private snack_bar_service: SnackService,
    private router: Router
  ) { }

  ngOnInit() { }

  @Input()
  set form_group ( form_group: FormGroup ) {
    this.form = form_group;
  }

  @Input()
  set consulta ( consulta: Consulta ) {
    this._consulta = consulta;
  }

  get nome_paciente () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.paciente.nome)
    );
  }

  get paciente () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.paciente)
    );
  }

  get data_consulta () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.dataAgendada)
    );
  }

  get medico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.medico)
    );
  }

  get nome_medico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.medico.nome)
    );
  }

  get nome_clinica () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.clinica.nome)
    );
  }

  get diagnostico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.reportagemConsulta.diagnostico)
    );
  }

  get descricao_diagnostico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.reportagemConsulta.diagnostico.descricao)
    );
  }

  get medicamentos () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.medicamentosQueToma)
    );
  }

  public salvar() {
    this.service_consulta.reportar(this.service.get_value()).then((data) => {
      this.snack_bar_service.open_snack_bar(
        'Consulta concluída'
      ).then((act) => {
        if ( act ) {
          this.router.navigate(['/pedilandia/consultas']);
        }
      })
    }).catch((error) => {
      this.snack_bar_service.open_snack_bar(
        'Consulta não finalizada. Algum erro ocorreu.',
        'danger',
        5000
      )
    })
  }
}
