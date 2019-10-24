import { Doenca } from '../doencas/doenca.model';

export class Medicamento {

    _id: string;
    nome: string;
    descricao: string;
    indicadoPara: Doenca[];

    constructor (
        nome: string = "",
        descricao: string = "",
        indicadoPara: Doenca[] = [],
        _id: string = ""
    ) {

        this._id = _id;
        this.nome = nome;
        this.descricao = descricao;
        this.indicadoPara = indicadoPara;

    }

}
