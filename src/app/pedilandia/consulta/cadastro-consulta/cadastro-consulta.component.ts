import { AuthService } from 'src/app/common/security/auth.service';
import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-cadastro-consulta',
    templateUrl: './cadastro-consulta.component.html',
    styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit{

    private consulta: Consulta;

    private tipoConsultaOptions: any[];

    private options: string[];

    private horaConsulta: string;

    constructor(
        private service: ConsultaService,
        private authService: AuthService,
        private consultaService: ConsultaService
    ) { 
        this.options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
    }

    
    ngOnInit() {
        this.tipoConsultaOptions = Object.keys(TipoConsulta).map((tipoConsulta) => {
            return {
                label: tipoConsulta,
                value: tipoConsulta
            }
        });
        this.consulta = new Consulta();

        const user = this.authService.usuarioLogado.value.usuario;
        
        if ( user ) {
            console.log(user);
            this.consulta = new Consulta(
                new Date(),
                new Date(),
                new Usuario(
                    {
                        _id : user._id,
                        nome: user.nome,
                        email: user.email,
                        fotoUrl: user.fotoUrl,
                        jwt: null,
                        telefone: user.telefone,
                        tipo: 0,
                        qtConsultas: 0
                    }
                ), "", "", "", "", "");
        } 
    }
            
    public limpar() {
        this.init_consulta();
    }
            
    async consultaGet() {        
        const res = await this.service.get();
    }

    private init_consulta () {
        const user = this.authService.usuarioLogado.value.usuario;
        if ( user ) {
            this.consulta = new Consulta(
                new Date(),
                new Date(),
                new Usuario(
                    {
                        _id : user._id,
                        nome: user.nome,
                        email: user.email,
                        fotoUrl: user.fotoUrl,
                        jwt: null,
                        telefone: user.telefone,
                        tipo: 0,
                        qtConsultas: 0
                    }
                ), "", "", "", "", "");
        }
    }

    public async cadastrar() {
        if (this.horaConsulta ) {
            let h = /([0-9]+(?=:))/g.exec(this.horaConsulta);
            let m = /(?<=:)([0-9]+)/g.exec(this.horaConsulta);
            this.consulta.dataConsulta.setHours(Number(h[0]), Number(m[0]));
            this.consultaService.insert(this.consulta).then((dado) => {
                if (dado) {
                    this.init_consulta();
                }
            });
        }
    }
}
