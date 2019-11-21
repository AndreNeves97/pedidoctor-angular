import { Consulta } from '../../consulta/consulta.model';
import { Diagnostico } from '../../diagnostico/diagnostico.model';

export class ReportagemConsulta {

    diagnostico: Diagnostico;
    horarioInicio: Date;
    horarioFinalizacao: Date;

    constructor (
        diagnostico: Diagnostico = new Diagnostico(),
        horarioInicio: Date = new Date(),
        horarioFinalizacao: Date = new Date()
    ) {
        this.diagnostico = diagnostico;
        this.horarioInicio = horarioInicio;
        this.horarioFinalizacao = horarioFinalizacao;
    }

}