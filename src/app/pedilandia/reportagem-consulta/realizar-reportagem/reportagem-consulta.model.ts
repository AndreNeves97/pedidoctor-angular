import { Consulta } from '../../consulta/consulta.model';
import { Diagnostico } from '../../diagnostico/diagnostico.model';

export class ReportagemConsulta {

    consulta: Consulta;
    diagnostico: Diagnostico;

    constructor (
        consulta: Consulta = new Consulta(),
        diagnostico: Diagnostico = new Diagnostico()
    ) {
        this.consulta = consulta;
        this.diagnostico = diagnostico;
    }

}