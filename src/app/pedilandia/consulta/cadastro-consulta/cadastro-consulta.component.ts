import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';

@Component({
    selector: 'app-cadastro-consulta',
    templateUrl: './cadastro-consulta.component.html',
    styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit {

    private consulta: Consulta;

    private tipoConsultaOptions: any[];

    constructor(
        private service: ConsultaService
    ) {
        this.consulta = new Consulta(
            new Date(),
            new Date(),
            new Usuario(
                {
                    nome: 'Leonam',
                    email: 'leonam@gmail.com',
                    fotoUrl: null,
                    jwt: null,
                    telefone: "(31)32165-4098"
                }
            ), "Diagnóstico", "Dor de cabeça", "Gadernal", "Gordo", "Sedentário");

    }

    async consultaGet() {        
        const res = await this.service.get();
        console.log(res);
    }

    ngOnInit() {
        this.tipoConsultaOptions = Object.keys(TipoConsulta).map((tipoConsulta) => {
            return {
                label: tipoConsulta,
                value: tipoConsulta
            }
        });
    }

    public limpar() {
        this.consulta = new Consulta();
    }

}
