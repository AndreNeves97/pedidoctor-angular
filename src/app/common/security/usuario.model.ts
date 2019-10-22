export class Usuario {

    _id: string;
    nome: string;
    email: string;
    tipo: number = 0;
    jwt: string;
    qtConsultas: number = 0;
    fotoUrl: string;
    telefone: string;

    constructor(params : {
        _id : string,
        nome: string,
        email: string,
        jwt: string,
        qtConsultas: number,
        fotoUrl: string,
        telefone: string,
        tipo: number 
    }) {
        Object.assign(this, params);
    }
}