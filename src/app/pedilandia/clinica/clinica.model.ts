export class Clinica {

    _id: string;
    nome: string;
    endereco: string;
    // googleMapsLocalId: string;
    // coordGeo: CoordenadaGeograficaInput;
    // secretarios : Secretario[];
    // medicos : Medico[];
    // enfermeiros : Enfermeiro[];
    // clientes : Cliente[];

    constructor(
        nome: string = "",
        endereco: string = ""
    ) {
        this.nome = nome;
        this.endereco = endereco;
    }
    
}