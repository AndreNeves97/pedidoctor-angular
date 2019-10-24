import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { DiagnosticoTipo } from './diagnostico-tipo.model';

@Injectable({
    providedIn: 'root'
})
export class DiagnosticoTipoService {

    constructor(
        private api: ApiService
    ) { } 

    async insert(obj: DiagnosticoTipo) {
        const response = await this.api.graphqlMutation(`
          mutation {
            createDiagnosticoTipo(
              obj:{
                nome:"${obj.nome}",
                descricao:"${obj.descricao}"
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
            diagnosticoTipos {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.diagnosticoTipos)
            return response.data.diagnosticoTipos;

        return null;

    }

    async find(id: string) {
        const response = await this.api.graphqlQuery(`
          query {
            diagnosticoTipo( 
              id: "${id}"	
            ) {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.diagnosticoTipo)
            return response.data.diagnosticoTipo;

        return null;

    }

    async update(obj: DiagnosticoTipo) {

        const response = await this.api.graphqlMutation(`
          mutation {
            updateDiagnosticoTipo (
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

        if (response.data && response.data.updateDiagnosticoTipo)
            return response.data.updateDiagnosticoTipo;

        return null;

    }

    async delete(id: string) {
        const response = await this.api.graphqlMutation(`
          mutation {
            deleteDiagnosticoTipo(
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
