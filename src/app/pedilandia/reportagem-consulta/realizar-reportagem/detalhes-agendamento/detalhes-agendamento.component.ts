import { Component, OnInit, Input } from '@angular/core';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';

@Component({
  selector: 'app-detalhes-agendamento',
  templateUrl: './detalhes-agendamento.component.html',
  styleUrls: ['./detalhes-agendamento.component.scss']
})
export class DetalhesAgendamentoComponent implements OnInit {

  private _consulta: Consulta;

  constructor() { }

  ngOnInit() { }

  @Input()
  set consulta(consulta: Consulta) {
    this._consulta = consulta;
  }

  get dataConsulta () {
    return this._consulta.dataConsulta;
  }

  get horario () {
    return `${new Date(this._consulta.dataConsulta).getHours()}:${new Date(this._consulta.dataConsulta).getMinutes()}`
  }

  get paciente () {
    return this._consulta.paciente;
  }

  get clinica () {
    return this._consulta.clinica;
  }

  get medico () {
    return this._consulta.medico;
  }

  get medicamentosQueToma () {
    if (this._consulta.medicamentosQueToma)
      return this._consulta.medicamentosQueToma;
    else 
      return [];
  }

  get doencasRecentes () {
    if (this._consulta.doencasRecentes)
      return this._consulta.doencasRecentes
    else  
      return [];
  }

  get informacoesAdicionais () { 
    return this._consulta.informacoesAdicionais;
  }

  get sintomasObservados () {
    if (this._consulta.sintomasObservados)
      return this._consulta.sintomasObservados;
    else 
      return [];
  }

  get tipoConsulta () {
    return this._consulta.tipoConsulta;
  }

}
