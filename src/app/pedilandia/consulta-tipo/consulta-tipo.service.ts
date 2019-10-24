import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { ConsultaTipo } from './consulta-tipo.model';

@Injectable({
    providedIn: 'root'
})
export class ConsultaTipoService {

    constructor(
        private api: ApiService
    ) { }

    async insert(consultaTipo: ConsultaTipo) {
        const response = await this.api.graphqlMutation(`
          mutation {
            createConsultaTipo(
              obj:{
                nome:"${consultaTipo.nome}",
                descricao:"${consultaTipo.descricao}"
              }
            ) {
              _id,
              nome,
              descricao 
            }
          }
        `);

        return response;
    }

    async findAll() {
        const response = await this.api.graphqlQuery(`
          query {
            consultaTipos {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.consultaTipos)
            return response.data.consultaTipos;

        return null;

    }

    async find(id: string) {
        const response = await this.api.graphqlQuery(`
          query {
            consultaTipo( 
              id: "${id}"	
            ) {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.consultaTipo)
            return response.data.consultaTipo;

        return null;

    }

    async update(obj: ConsultaTipo) {

        const response = await this.api.graphqlMutation(`
          mutation {
            updateConsultaTipo (
              id: "${obj._id}",
              obj: {
                nome: "${obj.nome}",
                descricao:"${obj.descricao}"
              }
            ) {
              _id,
              nome,
              descricao
            }
          }
        `)

        if (response.data && response.data.updateConsultaTipo)
            return response.data.updateConsultaTipo;

        return null;

    }

    async deleteClinica(id: string) {
        const response = await this.api.graphqlMutation(`
          mutation {
            deleteConsultaTipo(
              id: "${id}"
            ) {
              _id,
              nome,
              descricao
            }
          }
        `)

        return response;

    }
}
