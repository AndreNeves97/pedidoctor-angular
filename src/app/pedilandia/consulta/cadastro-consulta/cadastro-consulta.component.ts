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
        this.authService.usuarioLogado.subscribe((user) => {
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
                            telefone: user.telefone
                        }
                        ), "", "", "", "", "");
                    } 
                });
    }
            
    public limpar() {
        this.consulta = new Consulta();
    }
            
    async consultaGet() {        
        const res = await this.service.get();
        console.log(res);
    }
        
    public async cadastrar() {
        if (this.horaConsulta ) {
            let h = /([0-9]+(?=:))/g.exec(this.horaConsulta);
            let m = /(?<=:)([0-9]+)/g.exec(this.horaConsulta);
            this.consulta.dataConsulta.setHours(Number(h[0]), Number(m[0]));
            this.consultaService.insert(this.consulta).then((dado) => {
                console.log(dado);
                if (dado) {
                    this.consulta = new Consulta();
                }
            });
        }
    }
}
