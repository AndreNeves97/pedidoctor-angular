import { Component, OnInit, Input } from '@angular/core';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { FormGroup } from '@angular/forms';
import { ReportagemConsultaService } from '../../reportagem-consulta.service';
import { map, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-confirmacao-consulta',
  templateUrl: './confirmacao-consulta.component.html',
  styleUrls: ['./confirmacao-consulta.component.scss']
})
export class ConfirmacaoConsultaComponent implements OnInit {

  private form: FormGroup;

  private _consulta: Consulta;

  constructor(
    private service: ReportagemConsultaService
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
      map((consulta) => consulta.dataConsulta)
    );
  }

  get medico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.medico)
    );
  }

  get diagnostico () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.reportagemConsulta.diagnostico)
    );
  }

  get medicamentos () {
    return this.service.get_consulta().pipe(
      map((consulta) => consulta.medicamentosQueToma)
    );
  }
}
