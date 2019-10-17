export class Enfermeiro {

    _id: string;
    nome: string;
    email: string;
    jwt: string;
    fotoUrl: string;
    telefone: string;

    constructor(params : {
        _id : string,
        nome: string,
        email: string,
        jwt: string,
        fotoUrl: string,
        telefone: string
    }) {
        Object.assign(this, params);
    }

}