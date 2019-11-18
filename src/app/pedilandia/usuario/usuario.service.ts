import { ApiService } from 'src/app/common/api.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/common/security/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(
        private api: ApiService
    ) { }

    public async getUser(id: string) {
        const res = await this.api.graphqlQuery(`
            query {
                usuario(id: "${id}")  {
                    _id
                    nome
                    email
                    telefone
                    roles
                    isPaciente
                    fotoUrl
                }
            }
            `);

        if (res.data && res.data.usuario) {
            return res.data.usuario;
        }

        return null;
    }

    public async get() {
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

    public async getPacientes(): Promise<Usuario[]> {
        const res = await this.api.graphqlQuery(`
            query {
                usuarios(onlyPacientes:true) {
                _id, 
                nome, 
                }
            }
        ` );


        if (res.data && res.data.usuarios) {
            return res.data.usuarios;
        }

        return res;
    }

    public async getResumoForListing() {
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

        if (res.data && res.data.usuarios) {
            return res.data.usuarios;
        }

        return null;
    }

    public async updateUsuario(usuario: Usuario) {
        const response = await this.api.graphqlMutation(`
            mutation {
                updateUsuario (
                    id: "${usuario._id}",
                    obj: {
                        nome: "${usuario.nome}",
                        email: "${usuario.email}",
                        telefone: "${usuario.telefone}",
                        isPaciente: ${usuario.isPaciente},

                        ${
                            usuario.senha != "" && usuario.senha != null ?
                            `senha: "${usuario.senha}"` : '' 
                        }
                    }
                ) {
                    nome,
                    email,
                    _id,
                    telefone
                }
            }
        `);

        if(response.data && response.data.updateUsuario)
            return response.data.updateUsuario;
        else if(response.errors[0].extensions.exception.code == 11000) {
            throw 'email-existente';
        }

        return null;

    }

    async delete(id: string) {
        const response = await this.api.graphqlMutation(`
            mutation {
            deleteUsuario(id:"${id}"){
                    nome,
                    email,
                    _id
                }
            }
        `);

        return (response);
    }

    async insert(usuario: Usuario) {
        const response = await this.api.graphqlMutation(`
            mutation {
                createUsuario(
                obj:{
                    nome: "${usuario.nome}",
                    email: "${usuario.email}",
                    telefone: "${usuario.telefone}",
                    isPaciente: ${usuario.isPaciente},
                    senha: "${usuario.senha}"
                }) {
                    _id,
                    nome,
                    email,
                    telefone
                }
            }
        `);
        if(response.data && response.data.createUsuario)
            return response.data.createUsuario;
        else if(response.errors[0].extensions.exception.code == 11000) {
            throw 'email-existente';
        }

        return null;
    }

}
