export class Usuario {

    _id: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;

    constructor(
        nome: string = "",
        email: string = "",
        senha: string = "",
        telefone: string = ""
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }
}