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

    constructor(
        private service: ConsultaService,
        private authService: AuthService,
        private consultaService: ConsultaService
    ) { }

    
    ngOnInit() {
        this.tipoConsultaOptions = Object.keys(TipoConsulta).map((tipoConsulta) => {
            return {
                label: tipoConsulta,
                value: tipoConsulta
            }
        });
        this.consulta = new Consulta();
        this.authService.getFirebaseUser().subscribe((user) => {
            if ( user ) {
                console.log(user);
                this.consulta = new Consulta(
                    new Date(),
                    new Date(),
                    new Usuario(
                        {
                            nome: user.displayName,
                            email: user.email,
                            fotoUrl: user.photoURL,
                            jwt: null,
                            telefone: user.phoneNumber
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
        this.consultaService.insert(this.consulta).then((dado) => {
            if (dado) {
                console.log(dado);
                this.consulta = new Consulta();
            }
        });
    }
}
