import { Usuario } from '../usuario/usuario.model';

export class Consulta {

    _id: string;
    dataConsulta: Date;
    dataRegistro: Date;
    paciente: Usuario;
    tipoConsulta: string;
    sintomasObservados: string;
    medicamentosQueToma: string;
    doencasRecentes: string;
    informacoesAdicionais: string;
    
    constructor(
        dataConsulta: Date = new Date(),
        dataRegistro: Date = new Date(),
        paciente: Usuario = new Usuario(),
        tipoConsulta: string = "",
        sintomasObservados: string = "",
        medicamentosQueToma: string = "",
        doencasRecentes: string = "",
        informacoesAdicionais: string = ""
    ) {
        this.dataConsulta = dataConsulta;
        this.dataRegistro = dataRegistro;
        this.paciente = paciente;
        this.tipoConsulta = tipoConsulta;
        this.sintomasObservados = sintomasObservados;
        this.medicamentosQueToma = medicamentosQueToma;
        this.doencasRecentes = doencasRecentes;
        this.informacoesAdicionais = informacoesAdicionais;
    }

}