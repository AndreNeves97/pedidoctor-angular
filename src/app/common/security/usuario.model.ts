export enum GrupoUsuarioTipo {
    USER        = 'user',
    ADMIN       = 'admin' ,
    CLIENTE     = 'clientes' ,
    GERENTE     = 'gerentes',
    MEDICO      = 'medicos',
    SECRETARIO  = 'secretarios'  
}

export class UsuarioGrupo {
    tipo : string;
    parent?: string;
}

export class Usuario {

    _id: string;
    nome: string;
    email: string;
    tipo: number = 0;
    jwt: string;
    qtConsultas: number = 0;
    fotoUrl: string;
    telefone: string;
    roles: string[];
    senha?: string;
    isPaciente?: string;
    atribuicoes : any;

    constructor(params : {
        _id : string,
        nome: string,
        email: string,
        jwt: string,
        qtConsultas: number,
        fotoUrl: string,
        telefone: string,
        roles?: string[],
        atribuicoes?: any,
        tipo: number,
        senha?: string,
        isPaciente?: boolean
    }) {
        Object.assign(this, params);
    }
}

export enum LoginUsuarioStatus {
    UNDEFINED = 'undefined',
    DESLOGADO = 'deslogado',
    VALIDANDO = 'validando',
    LOGADO = 'logado'
}

export class UsuarioLogadoModel {
    status : LoginUsuarioStatus;
    usuario : Usuario;
}
