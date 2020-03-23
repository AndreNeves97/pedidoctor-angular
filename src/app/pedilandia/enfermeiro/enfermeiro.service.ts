import { Injectable } from '@angular/core';
import { Enfermeiro } from './enfermeiro.model';
import { ApiService } from 'src/app/common/api.service';

@Injectable({
  providedIn: 'root'
})
export class EnfermeiroService {

  constructor(
    private api: ApiService
  ) { }

  async getResumoForListing () {
    const response = await this.api.graphqlQuery(`
      query {
        findByTipo(tipo: 1) {
          _id,
          nome,
          email,
          telefone
        }
      }
    `);

    return response.data.findByTipo;
  }

  async insert ( enfermeiro: Enfermeiro ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        createUsuario(
          obj:{
            nome: "${enfermeiro.nome}",
            email: "${enfermeiro.email}",
            telefone: "${enfermeiro.telefone}",
            isPaciente: false,
            responsavelPor: [],
            usoMedicamentos: [],
            acontecimentos: [],
            tipo: 1
          }) {
            _id,
            nome,
            email,
            telefone
        }
      }
    `);

    return response;
  }

  async findAll (  ) {
    const response = await this.api.graphqlQuery(`
      query {
        users {
          _id, 
          nome, 
          email, 
          telefone, 
          fotoUrl, 
          roles
        }
      }
    `);

    return response.data.users;
  }

  async find ( id: string ) {
    const response = await this.api.graphqlQuery(`
      query {
        usuario(id: "${id}")  {
          _id,
          nome,
          email,
          telefone,
          fotoUrl
        }
      }
    `);

    return response.data.usuario;
  }

  async updateEnfermeiro ( enfermeiro: Enfermeiro ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        updateUsuario (
          id: "${enfermeiro._id}",
          obj: {
            nome: "${enfermeiro.nome}",
            email: "${enfermeiro.email}",
            telefone: "${enfermeiro.telefone}",
            isPaciente: false,
            responsavelPor: [],
            usoMedicamentos: [],
            acontecimentos: [],
            tipo: 1
          }
        ) {
          nome,
          email,
          _id,
          telefone
        }
      }
    `);

    return response;
  }

  async deleteEnfermeiro ( id: string ) {
    const response = await this.api.graphqlMutation(`
      mutation {
    
        deleteUsuario(id: "${id}") {
          _id,
          nome,
          email,
          telefone
        }
        
      }
    `);

    return response;
  }


}
