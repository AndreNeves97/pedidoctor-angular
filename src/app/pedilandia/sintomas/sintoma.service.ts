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

    console.log(sintoma);

    // const response = await this.api.graphqlMutation(`
    //   mutation {
    //     createSintoma(obj:{
    //       nome: "${sintoma.nome}",
    //       descricao: "${sintoma.descricao}"
    //     }) {
    //       _id,
    //       nome,
    //       descricao
    //     }
    //   }
    // `);

    // return response;
    return '';
  
  }

  async find ( id: string ) {
    
    const response = await this.api.graphqlQuery(`
    
    `);

    if ( response.data && response.data.sintoma )
      return response.data.sintoma;

    return null;

  }

  async findAll () {

    const response = await this.api.graphqlQuery(`
        query {
          sintomas {
            _id,
            nome,
            descricao
          }
        }
    `);

    if ( response.data && response.data.sintomas )
      return response.data.sintomas;
      
    return null;

  }

  async delete ( id: string ) {
    
    const response = await this.api.graphqlMutation(`
    
    `);

    return response;

  }

  async update ( sintoma: Sintoma ) {

    const response = await this.api.graphqlMutation(`
    
    `);

    if ( response.data && response.data.updateSintoma )
      return response.data.updateSintoma

    return null;

  }

}
