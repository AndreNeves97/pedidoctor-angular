import { Injectable } from '@angular/core';
import { Consulta }   from '../consulta/consulta.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportagemConsultaService {

  private source = new BehaviorSubject<Consulta>(new Consulta());

  constructor() { }

  public get_value () {
    return this.source.value;
  }

  public get_consulta ( ) { 
    return this.source.asObservable();
  }

  public update( consulta: Consulta ) {
    this.source.next(consulta);
  }

  public set_descricao_diagnostico ( new_consulta: Consulta ) {
    let consulta: Consulta = this.source.value;
    consulta.realizacao.diagnostico.descricao = new_consulta.realizacao.diagnostico.descricao;
    this.update(consulta);
  }

  public set_medicamento_diagnostico ( new_consulta: Consulta ) {
    let consulta: Consulta = this.source.value;
    consulta.medicamentosQueToma = new_consulta.medicamentosQueToma;
    this.update(consulta);
  }

  public set_horario_inicio_now () {
    let consulta: Consulta = this.source.value;
    consulta.realizacao.horarioInicio = new Date();
    this.update(consulta);
  }

  public set_horario_final_now () {
    let consulta: Consulta = this.source.value;
    consulta.realizacao.horarioFinalizacao = new Date();
    this.update(consulta);  
  }

}
