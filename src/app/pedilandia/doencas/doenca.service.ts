import { Injectable } from '@angular/core';
import { Doenca } from './doenca.model';
import { ApiService } from 'src/app/common/api.service';

@Injectable({
  providedIn: 'root'
})
export class DoencaService {

  constructor(
    private api: ApiService
  ) { }

  async insert ( doenca: Doenca ) {

    let mutation_header = `
      mutation {
        createDoenca( obj: {
          nome: "${ doenca.nome }",
          descricao: "${ doenca.descricao }",
          sintomas: [

    `;

    let mutation_body = ``;

    let mutation_footer = `
          ]
        }) {
          _id,
          nome,
          descricao,
          sintomas {
            nome
          }
        }
      }
    `;

    doenca.sintomas.forEach((sintoma_id) => {
      mutation_body += `{ _id : "${ sintoma_id }"},\n`
    })

    const response = await this.api.graphqlMutation(
      mutation_header + mutation_body + mutation_footer
    );

    return response;

  }

  async find ( id: string ) {
    const response = await this.api.graphqlQuery(`
      query {
        doenca( id: "${id}") {
          _id,
          nome,
          descricao,
          sintomas {
            _id,
            nome,
            descricao
          }
        }
    }
    `);

    if ( response.data && response.data.doenca ) 
      return response.data.doenca;

    return null;
  }

  async findAll_resumo () {
    const response = await this.api.graphqlQuery(`
      query {
        doencas {
          _id,
          nome,
          descricao,
        }
      }
    `);
  
    if ( response.data && response.data.doencas ) 
      return response.data.doencas;
  
    return null;
  }

  async findAll ( ) {
    const response = await this.api.graphqlQuery(`
      query {
        doencas {
          _id,
          nome,
          descricao,
          sintomas {
            _id,
            nome,
            descricao
          }
        }
      }
    `);

    if ( response.data && response.data.doencas ) 
      return response.data.doencas;

    return null;
  }

  async delete ( id: string ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        deleteDoenca(id: "${id}") {
          _id,
          nome,
          descricao
        }
      }
    `)

    return response;
  }

  async update (  doenca: Doenca ) {

    let mutation_header = `
      mutation {
        updateDoenca( 
          id: "${doenca._id}",
          obj: {
            nome: "${ doenca.nome }",
            descricao: "${ doenca.descricao }",
            sintomas: [

    `;

    let mutation_body = ``;

    let mutation_footer = `
          ]
        }) {
          _id,
          nome,
          descricao,
          sintomas {
            nome
          }
        }
      }
    `;

    doenca.sintomas.forEach((sintoma_id) => {
      mutation_body += `{ _id : "${ sintoma_id }"},\n`
    })

    const response = await this.api.graphqlMutation(
      mutation_header + mutation_body + mutation_footer
    );

    if ( response.data && response.data.updateDoenca ) 
      return response.data.updateDoenca;

    return null;    
  }

}
