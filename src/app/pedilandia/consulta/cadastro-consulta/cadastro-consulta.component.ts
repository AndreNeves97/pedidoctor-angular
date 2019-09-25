import { AuthService } from 'src/app/common/security/auth.service';
import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';

@Component({
    selector: 'app-cadastro-consulta',
    templateUrl: './cadastro-consulta.component.html',
    styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit{

    private consulta: Consulta;

    private tipoConsultaOptions: any[];

    private horaconsulta: any;

    constructor(
        private service: ConsultaService,
        private authService: AuthService,
        private consultaService: ConsultaService
    ) { 

        this.horaconsulta = new Date();

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
        console.log(typeof(this.horaconsulta));
        // this.consulta.dataConsulta.setHours(Number(this.horaconsulta.getHours()), Number(this.horaconsulta.getMinutes()));

        // this.consultaService.insert(this.consulta).then((dado) => {
        //     console.log(dado);
        //     if (dado) {
        //         this.consulta = new Consulta();
        //     }
        // });
        // console.log(this.consulta)
        console.log(this.horaconsulta);
    }
}
