import { ApiService } from 'src/app/common/api.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/common/security/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private api : ApiService
  ) { }

  public async getUser ( id: string ) {
    const res = await this.api.graphqlQuery(`
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

        if(res.data && res.data.usuario) {
            return res.data.usuario;
        }
        
        return null;
  }

  public async get () {
    const res = await this.api.graphqlQuery(`
      query {
        usuarios {
          _id, 
          nome, 
          email, 
          telefone
        }
      }
  ` );

    console.log(res);

    // if(res.data && res.data.usuarios) {
    //   return res.data.usuarios;
    // }
        
    return res;
  }

  public async getResumoForListing () {
    const res = await this.api.graphqlQuery(`
      query {
        usuarios {
          _id, 
          nome, 
          email, 
          qtConsultas
        }
      }
   `);

    if(res.data && res.data.usuarios) {
      return res.data.usuarios;
    }
        
    return null;
  }

  public async updateUsuario ( usuario: Usuario ) {
    const res = await this.api.graphqlMutation(`
      mutation {
        updateUsuario (
          id: "${usuario._id}",
          obj: {
            nome: "${usuario.nome}",
            email: "${usuario.email}",
            telefone: "${usuario.telefone}",
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

    return res;

    // if(res.data && res.data.updateUser) {
      // return res.data;
    // }
      
    // return null;

  }

  async delete ( id: string ) {
    const response = await this.api.graphqlMutation(`
        mutation {
          deleteUsuario(id:"${id}"){
                nome,
                email,
                _id
            }
        }
    `);

    return(response);
  } 

  async insert ( usuario: Usuario ) {
    const response = await this.api.graphqlMutation(`
      mutation {
        createUsuario(
          obj:{
            nome: "${usuario.nome}",
            email: "${usuario.email}",
            telefone: "${usuario.telefone}",
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
    return(response);
  }

}
