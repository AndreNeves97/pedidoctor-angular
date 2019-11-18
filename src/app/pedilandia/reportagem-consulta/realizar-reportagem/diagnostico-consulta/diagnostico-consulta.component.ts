import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { ReportagemConsulta } from '../reportagem-consulta.model';
import { Diagnostico } from 'src/app/pedilandia/diagnostico/diagnostico.model';
import { ReportagemConsultaService } from '../../reportagem-consulta.service';

@Component({
  selector: 'app-diagnostico-consulta',
  templateUrl: './diagnostico-consulta.component.html',
  styleUrls: ['./diagnostico-consulta.component.scss']
})
export class DiagnosticoConsultaComponent implements OnInit {

  private form: FormGroup;
  private _consulta: Consulta;

  constructor(
    private service: ReportagemConsultaService
  ) { }

  ngOnInit() { }

  @Input()
  set form_group ( form: FormGroup ) {
    this.form = form;
  }

  @Input()
  set consulta ( consulta: Consulta ) {
    this._consulta = consulta;
    this._consulta.reportagemConsulta = new ReportagemConsulta();
    this._consulta.reportagemConsulta.diagnostico = new Diagnostico();
    if ( this.form ) {
      let today = new Date();
      this.form.patchValue({
        descricao : 
`Data: ${ today.getDate() }/${ today.getMonth() }/${ today.getFullYear() }
Consulta iniciada em: ${ today.getHours() }:${ today.getMinutes() }h
------------------------------------------------
Médico: ${ this._consulta.medico.nome }
Paciente: ${ this._consulta.paciente.nome }
------------------------------------------------
Descrição do diagnóstico:`
      })
    }
  }

  get descricao () {
    return this.form.get('descricao').value;
  }

  get paciente () {
    if ( this._consulta )
      return this._consulta.paciente;
    return null
  }

  update_bloc_object() {
    this._consulta.reportagemConsulta.diagnostico.descricao = this.descricao;
    this.service.update(this._consulta);
  }

}
