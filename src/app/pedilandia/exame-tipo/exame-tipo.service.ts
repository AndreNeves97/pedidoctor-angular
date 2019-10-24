import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { ExameTipo } from './exame-tipo.model';

@Injectable({
    providedIn: 'root'
})
export class ExameTipoService {

    constructor(
        private api: ApiService
    ) { }

    async insert(obj: ExameTipo) {
        const response = await this.api.graphqlMutation(`
          mutation {
            createExameTipo(
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
            exameTipos {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.exameTipos)
            return response.data.exameTipos;

        return null;

    }

    async find(id: string) {
        const response = await this.api.graphqlQuery(`
          query {
            exameTipo( 
              id: "${id}"	
            ) {
              _id,
              nome,
              descricao
            }
          }
        `);

        if (response.data && response.data.exameTipo)
            return response.data.exameTipo;

        return null;

    }

    async update(obj: ExameTipo) {

        const response = await this.api.graphqlMutation(`
          mutation {
            updateExameTipo (
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

        if (response.data && response.data.updateExameTipo)
            return response.data.updateExameTipo;

        return null;

    }

    async delete(id: string) {
        const response = await this.api.graphqlMutation(`
          mutation {
            deleteExameTipo(
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
