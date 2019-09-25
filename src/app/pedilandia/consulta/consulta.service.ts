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

    async getResumoForListing () {
        const res = await this.api.graphqlQuery(`
            query {
                consultas {
                    _id
                    dataConsulta
                    paciente {
                        nome
                    }
                    tipoConsulta
                }
            }
        `);
        

        if(res.data && res.data.consultas) {
            return res.data.consultas;
        }

        return res.data;
        
        // return null;
    }

    async insert ( consulta: Consulta ) {
            const response = await this.api.graphqlMutation(`
                mutation {
                    createConsulta (obj: {
                        dataConsulta: "${consulta.dataConsulta}",
                        paciente: {
                          _id: "${consulta.paciente._id}"
                        },
                        tipoConsulta : "${consulta.tipoConsulta}",
                        sintomasObservados : "${consulta.sintomasObservados}",
                        medicamentosQueToma : "${consulta.medicamentosQueToma}",
                        doencasRecentes : "${consulta.doencasRecentes}",
                        informacoesAdicionais : "${consulta.informacoesAdicionais}"
                      }) {
                        dataConsulta,
                        _id
                    }
                }
            `);
            
            // if(response.data) {
                return(response);
            // }
            
            // return(null);
// 
    }
}
