import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';
import { Medico } from './medico.model';
import { Clinica } from '../clinica/clinica.model';
import { Usuario } from 'src/app/common/security/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private api: ApiService
  ) { }

  async getResumoForListing () {
    const response = await this.api.graphqlQuery(`
      query {
        findByTipo(tipo: 2) {
          _id,
          nome,
          email,
          telefone
        }
      }
    `);

    return response.data.findByTipo;
  }

  async insert ( medico: Medico ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        createUsuario(
          obj:{
            nome: "${medico.nome}",
            email: "${medico.email}",
            telefone: "${medico.telefone}",
            isPaciente: false,
            responsavelPor: [],
            usoMedicamentos: [],
            acontecimentos: [],
            tipo: 2
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
        findByTipo(tipo: 2) {
          _id, 
          nome, 
          email, 
          telefone, 
          fotoUrl, 
          roles
        }
      }
    `);

    return response.data.findByTipo;
  }

  async findByClinica(clinica : Clinica) : Promise<Usuario[]> {
    
    const response = await this.api.graphqlQuery(`
        query {
            clinica(id:"${clinica._id}") {
            _id
            
            medicos {
                _id
                nome
            }
            }
        }
  `);

    // console.log(response);

    return response.data.clinica.medicos;
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

    console.log(response);

    return response.data.usuario;
  }

  async updateEnfermeiro ( medico: Medico ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        updateUsuario (
          id: "${medico._id}",
          obj: {
            nome: "${medico.nome}",
            email: "${medico.email}",
            telefone: "${medico.telefone}",
            isPaciente: false,
            responsavelPor: [],
            usoMedicamentos: [],
            acontecimentos: [],
            tipo: 2
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
