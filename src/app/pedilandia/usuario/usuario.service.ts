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
            user(id: "${id}")  {
              _id,
              nome,
              email,
              telefone,
              fotoUrl
            }
          }
        `);

        if(res.data && res.data.user) {
            return res.data.user;
        }
        
        return null;
  }

  public async get () {
    const res = await this.api.graphqlQuery(`
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

        if(res.data && res.data.users) {
            return res.data.users;
        }
        
        return null;
  }

  public async getResumoForListing () {
    const res = await this.api.graphqlQuery(`
            query {
              users {
                _id, 
                nome, 
                email, 
              }
            }
        `);

      if(res.data && res.data.users) {
        return res.data.users;
      }
        
      return null;
  }

  public async updateUsuario ( usuario: Usuario ) {
    const res = await this.api.graphqlMutation(`
        mutation {
          updateUser (
            id: "${usuario._id}",
            obj: {
              nome: "${usuario.nome}",
              email: "${usuario.email}"
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
            deleteUser(id:"${id}"){
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
              createCliente(obj:{
                nome: "${usuario.nome}"
                email: "${usuario.email}"
              }) {
                _id
                nome
                email
              }
            }
        `);
    return(response);
  }

}
