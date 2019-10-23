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

    `);

    return response;
  
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
