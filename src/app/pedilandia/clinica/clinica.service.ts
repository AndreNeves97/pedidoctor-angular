import { Injectable } from '@angular/core';
import { Clinica } from './clinica.model';
import { ApiService } from 'src/app/common/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(
    private api : ApiService
  ) { }

  async insert ( clinica: Clinica ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        createClinica(
          obj:{
            nome:"${clinica.nome}",
            endereco:"${clinica.endereco}",
            googleMapsLocalId:"",
            coordGeo:{
              latitude:"",
              longitude:""
            },
            secretarios:[],
            medicos:[],
            enfermeiros:[],
            clientes:[]
          }
        ) {
          _id,
          nome,
          endereco
        }
      }
    `);
    
    return response;
  }

  async findAll () {
    const response = await this.api.graphqlQuery(`
      query {
        clinicas {
          _id,
          nome,
          endereco
        }
      }
    `);

    if ( response.data && response.data.clinicas ) 
      return response.data.clinicas;

    return null;  
    
  }
  
  async find ( id: string ) {
    const response = await this.api.graphqlQuery(`
      query {
        clinica( 
          id: "${id}"	
        ) {
          _id,
          nome,
          endereco
        }
      }
    `);
  
    if ( response.data && response.data.clinica ) 
      return response.data.clinica;
  
    return null;  
    
  }

  async updateClinica ( clinica: Clinica ) {

    const response = await this.api.graphqlMutation(`
      mutation {
        updateClinica (
          id: "${clinica._id}",
          obj: {
            nome: "${clinica.nome}",
            endereco:"${clinica.endereco}",
            googleMapsLocalId:"",
            coordGeo:{
              latitude:"",
              longitude:""
            },
            secretarios:[],
            medicos:[],
            enfermeiros:[],
            clientes:[]
          }
        ) {
          _id,
          nome,
          endereco
        }
      }
    `)

    if ( response.data && response.data.updateClinica ) 
      return response.data.updateClinica;

    return null;

  }

  async deleteClinica ( id: string ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        deleteClinica(
          id: "${id}"
        ) {
          _id,
          nome,
          endereco
        }
      }
    `)
    
    return response;

  }

}
