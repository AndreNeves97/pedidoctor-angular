import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { Medicamento } from './medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(
    private api: ApiService
  ) { }

  async insert ( medicamento: Medicamento ) {

    let mutation_header = `
      mutation {
    
        createMedicamento (
          obj:{
            nome : "${ medicamento.nome }",
            descricao : "${ medicamento.descricao }",
            indicadoPara : [
    `;

    let mutation_body = ``;

    let mutation_footer = `
            ]
          }
        ) {
          nome,
          descricao,
          indicadoPara {
            nome
          }
        }

      }
    `;


    medicamento.indicadoPara.forEach((doenca_id) => {
      mutation_body += `{ _id : "${ doenca_id }" },\n`;
    })

    const response = await this.api.graphqlMutation(
      mutation_header + mutation_body + mutation_footer
    );

    return response;
  }

  async find ( id: string ) {
    const response = await this.api.graphqlQuery(`
      query {
        medicamento ( 
          id : "${ id }"
        ) {
          _id,
          nome,
          descricao,
          indicadoPara {
            _id,
            nome,
            descricao
          }
        }
      }
    `);

    if ( response.data && response.data.medicamento )
      return response.data.medicamento;

    return null;
  }

  async findAll_resumo () {
    const response = await this.api.graphqlQuery(`
      query {
        medicamentos {
          _id,
          nome,
          descricao
        }
      }
    `);

    if ( response.data && response.data.medicamentos )
      return response.data.medicamentos;

    return null;
  }

  async findAll () {
    const response = await this.api.graphqlQuery(`
      query {
        medicamentos {
          _id,
          nome,
          descricao,
          indicadoPara {
            _id,
            nome,
            descricao
          }
        }
      }
    `);

    if ( response.data && response.data.medicamentos )
      return response.data.medicamentos;

    return null;
  }

  async delete ( id: string ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        deleteMedicamento (
          id : "${ id }"
        ) {
          _id,
          nome,
          descricao
        }
      }
    `);

    return response;
  }

  async update ( medicamento: Medicamento ) {

    let mutation_header = `
      mutation {
    
        updateMedicamento (
          id : "${ medicamento._id }",
          obj:{
            nome : "${ medicamento.nome }",
            descricao : "${ medicamento.descricao }",
            indicadoPara : [
    `;

    let mutation_body = ``;

    let mutation_footer = `
            ]
          }
        ) {
          nome,
          descricao,
          indicadoPara {
            nome,
            descricao
          }
        }

      }
    `;


    medicamento.indicadoPara.forEach((doenca_id) => {
      mutation_body += `{ _id : "${ doenca_id }" },\n`;
    })

    const response = await this.api.graphqlMutation(
      mutation_header + mutation_body + mutation_footer
    );

    if ( response.data && response.data.updateMedicamento )
      return response.data.updateMedicamento;

    return null;
  }

}
