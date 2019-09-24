import { Consulta } from './consulta.model';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    constructor(
        private api : ApiService
    ) { }

    async get() {        
        const res = await this.api.graphqlQuery(`
            query {
                consultas {
                _id
                dataConsulta
                dataRegistro
                paciente {
                    _id
                    nome
                    email
                    telefone
                    fotoUrl
                }
                tipoConsulta
                sintomasObservados
                medicamentosQueToma
                doencasRecentes
                informacoesAdicionais
                }
            }
        `);
        

        if(res.data && res.data.consultas) {
            return res.data.consultas;
        }
        
        return null;
    }

    async insert ( consulta: Consulta ) {
        return new Promise((resolve, reject) => {
            
            resolve(consulta);

        })
    }
}
