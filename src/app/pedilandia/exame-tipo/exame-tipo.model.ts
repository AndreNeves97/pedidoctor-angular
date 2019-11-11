

export class ExameTipo {

    _id: string;
    nome: string;
    descricao: string;
    
    constructor(
        nome: string = "",
        descricao: string = "",
        _id : string = ""
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this._id = _id;
    }

}