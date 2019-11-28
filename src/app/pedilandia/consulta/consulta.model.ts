import { Usuario } from '../../common/security/usuario.model';
import { Clinica } from '../clinica/clinica.model';
import { Medico } from '../medico/medico.model';
import { ConsultaTipo } from '../consulta-tipo/consulta-tipo.model';
import { Sintoma } from '../sintomas/sintoma.model';
import { ReportagemConsulta } from '../reportagem-consulta/realizar-reportagem/reportagem-consulta.model';

export class HorarioConsultaSelecao {
    horario : string;
    disponivel : boolean;

    constructor(horario : string, disponivel : boolean) {
        this.horario = horario;
        this.disponivel = disponivel;
    }
}

export class Consulta {

    _id: string;
    clinica: Clinica;
    medico: Medico;
    dataConsulta: Date;
    dataAgendada: Date;
    dataRegistro: Date;
    paciente: Usuario;
    tipoConsulta: ConsultaTipo;
    sintomasObservados: Sintoma[];
    medicamentosQueToma: string[];
    doencasRecentes: string[];
    informacoesAdicionais: string;
    realizacao: ReportagemConsulta;
    
    constructor(
        dataConsulta: Date  = new Date(),
        dataRegistro: Date  = new Date(),
        paciente: Usuario   = new Usuario({
            _id         : null,
            email       : null,
            fotoUrl     : null,
            jwt         : null,
            nome        : null,
            telefone    : null,
            tipo        : 0,
            qtConsultas : 0
        }),
        tipoConsulta: ConsultaTipo = new ConsultaTipo(),
        sintomasObservados: Sintoma[] = [],
        medicamentosQueToma: string[] = [],
        doencasRecentes: string[] = [],
        informacoesAdicionais: string = "",
        clinica: Clinica = new Clinica(),
        medico: Medico = new Medico({
            _id     : "",
            nome    : "",
            email   : "",
            jwt     : "",
            fotoUrl : "",
            telefone: ""
        }),
        dataAgendada: Date  = new Date(),
    ) {
        this.dataConsulta = dataConsulta;
        this.dataRegistro = dataRegistro;
        this.paciente = paciente;
        this.tipoConsulta = tipoConsulta;
        this.sintomasObservados = sintomasObservados;
        this.medicamentosQueToma = medicamentosQueToma;
        this.doencasRecentes = doencasRecentes;
        this.informacoesAdicionais = informacoesAdicionais;
        this.clinica = clinica;
        this.medico = medico;
        this.realizacao = new ReportagemConsulta();
        this.dataAgendada = dataAgendada;
    }

}