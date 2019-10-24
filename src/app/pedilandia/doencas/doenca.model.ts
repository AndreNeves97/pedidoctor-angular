import { Sintoma } from '../sintomas/sintoma.model';

export class Doenca {

    _id: string;
    nome: string;
    descricao: string;
    sintomas: Sintoma[];

    constructor (
        nome: string = "",
        descricao: string = "",
        sintomas: Sintoma[] = [],
        _id: string = ""
    )  {
        this._id = _id;
        this.nome = nome;
        this.descricao = descricao;
        this.sintomas = sintomas;
    }

}
