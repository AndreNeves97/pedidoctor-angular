import { Consulta } from '../../consulta/consulta.model';
import { Diagnostico } from '../../diagnostico/diagnostico.model';

export class ReportagemConsulta {

    diagnostico: Diagnostico;

    constructor (
        diagnostico: Diagnostico = new Diagnostico()
    ) {
        this.diagnostico = diagnostico;
    }

}