import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { Sintoma } from './sintoma.model';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {

  constructor(
    private api: ApiService
  ) { }

  async insert ( sintoma: Sintoma ) {

    const response = await this.api.graphqlMutation(`
      mutation {
        createSintoma(obj:{
          nome: "${sintoma.nome}",
          descricao: "${sintoma.descricao}"
        }) {
          _id,
          nome,
          descricao
        }
      }
    `);

    return response;
  
  }

  async find ( id: string ) {
    
    const response = await this.api.graphqlQuery(`
      query {
    
        sintoma(id: "${id}") {
          _id,
          nome,
          descricao
        }
        
      }
    `);

    if ( response.data && response.data.sintoma )
      return response.data.sintoma;

    return null;

  }

  async findAll (select = '_id,nome,descricao', query = "") {

    const response = await this.api.graphqlQuery(`
        query {
          sintomas(query: "${query}") {
            ${select}
          }
        }
    `);

    if ( response.data && response.data.sintomas )
      return response.data.sintomas;
      
    return null;

  }

  async delete ( id: string ) {
    
    const response = await this.api.graphqlMutation(`
      mutation {
    
        deleteSintoma(id: "${ id }")  {
          _id,
          nome,
          descricao
        }
        
      }
    `);

    return response;

  }

  async update ( sintoma: Sintoma ) {

    const response = await this.api.graphqlMutation(`
      mutation {
    
        updateSintoma ( 
          id: "${ sintoma._id }",
          obj: {
            nome: "${ sintoma.nome }",
            descricao: "${ sintoma.descricao }"
          }
        ) {
          _id,
          nome,
          descricao
        }
        
      }
    `);

    if ( response.data && response.data.updateSintoma )
      return response.data.updateSintoma

    return null;

  }

}
