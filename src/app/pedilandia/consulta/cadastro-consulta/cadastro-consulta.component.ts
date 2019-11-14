import { AuthService } from 'src/app/common/security/auth.service';
import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
    selector: 'app-cadastro-consulta',
    templateUrl: './cadastro-consulta.component.html',
    styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit{

    private consulta: Consulta;

    private hora_consulta   : string;
    private clinica         : string;
    private medico          : string;

    private primeiro_form_group : FormGroup;
    private segundo_form_group  : FormGroup;
    private terceiro_form_group : FormGroup;
    private quarto_form_group   : FormGroup;

    private horarios_disponiveis: string[];
    private options             : string[];
    private clinicas            : string[];
    private medicos             : string[];
    private tipoConsultaOptions : any[];

    // private consulta: Consulta;



    // private horaConsulta: string;

    // constructor(
    //     private service: ConsultaService,
    //     private authService: AuthService,
    //     private consultaService: ConsultaService
    // ) { 
    //     this.options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
    // }

    
    // ngOnInit() {
    //     this.tipoConsultaOptions = Object.keys(TipoConsulta).map((tipoConsulta) => {
    //         return {
    //             label: tipoConsulta,
    //             value: tipoConsulta
    //         }
    //     });
    //     this.consulta = new Consulta();

    //     const user = this.authService.usuarioLogado.value.usuario;
        
    //     if ( user ) {
    //         console.log(user);
    //         this.consulta = new Consulta(
    //             new Date(),
    //             new Date(),
    //             new Usuario(
    //                 {
    //                     _id : user._id,
    //                     nome: user.nome,
    //                     email: user.email,
    //                     fotoUrl: user.fotoUrl,
    //                     jwt: null,
    //                     telefone: user.telefone,
    //                     tipo: 0,
    //                     qtConsultas: 0
    //                 }
    //             ), "", "", "", "", "");
    //     } 
    // }
            
    // public limpar() {
    //     this.init_consulta();
    // }
            
    // async consultaGet() {        
    //     const res = await this.service.get();
    // }

    // private init_consulta () {
    //     const user = this.authService.usuarioLogado.value.usuario;
    //     if ( user ) {
    //         this.consulta = new Consulta(
    //             new Date(),
    //             new Date(),
    //             new Usuario(
    //                 {
    //                     _id : user._id,
    //                     nome: user.nome,
    //                     email: user.email,
    //                     fotoUrl: user.fotoUrl,
    //                     jwt: null,
    //                     telefone: user.telefone,
    //                     tipo: 0,
    //                     qtConsultas: 0
    //                 }
    //             ), "", "", "", "", "");
    //     }
    // }

    // public async cadastrar() {
    //     if (this.horaConsulta ) {
    //         let h = /([0-9]+(?=:))/g.exec(this.horaConsulta);
    //         let m = /(?<=:)([0-9]+)/g.exec(this.horaConsulta);
    //         this.consulta.dataConsulta.setHours(Number(h[0]), Number(m[0]));
    //         this.consultaService.insert(this.consulta).then((dado) => {
    //             if (dado) {
    //                 this.init_consulta();
    //             }
    //         });
    //     }
    // }


    
    constructor (
        private form_builder        : FormBuilder,
        private service             : ConsultaService,
        private router              : Router,
        private snack_bar_service   : SnackService
    ) { }

    ngOnInit(){ 

        this.consulta = new Consulta();

        this.options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', 
                        '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', 
                        '14:30', '15:00', '15:30'];

        this.clinicas = ['São Judas Tadeu', 'Vital Brazil'];

        this.medicos = ['André M. S. N.', 'Leonam T. V.'];

        this.tipoConsultaOptions = [
            { label: 'Diagnóstico', value:"diag" },
            { label: 'Pós-Operatório', value:"posop" },
            { label: 'Pré-Operatório', value:"preop" },
            { label: 'Checkup', value:"check" },
        ]

        this.quarto_form_group = this.form_builder.group({
            medicamentosQueToma: [
                this.consulta.medicamentosQueToma
            ],
            doencasRecentes: [
                this.consulta.doencasRecentes
            ],
            informacoesAdicionais: [
                this.consulta.informacoesAdicionais
            ]
        });

        this.terceiro_form_group = this.form_builder.group({
            tipoConsulta: [
                this.consulta.tipoConsulta,
                [
                    Validators.required
                ]
            ],
            sintomasObservados: [
                this.consulta.sintomasObservados
            ]
        });

        this.segundo_form_group = this.form_builder.group({
            data: [
                this.consulta.dataConsulta,
                [
                    Validators.required
                ]
            ],
            horario: [
                this.hora_consulta,
                [
                    Validators.required
                ]
            ]
        });

        this.primeiro_form_group = this.form_builder.group({
            clinica: [
                this.clinica,
                [
                    Validators.required
                ]
            ],
            medico: [
                this.medico,
                [
                    Validators.required
                ]
            ]
        })

        this.hora_consulta = null;

        

    }

    private date_change() {
        if ( this.segundo_form_group.get('data').valid ) {
            this.segundo_form_group.get('horario').enable();
            // Preencher horarios disponiveis
        } else {
            this.segundo_form_group.get('horario').disable();
        }

    }

    private check_medico_clinica() {
        if ( this.primeiro_form_group.get('clinica').valid ) {
            this.primeiro_form_group.get('medico').enable();
            // Preencher médicos disponíveis
        } else {
            this.primeiro_form_group.get('medico').disable();
        }
    }

}
