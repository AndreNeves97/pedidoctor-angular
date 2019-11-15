import { AuthService } from 'src/app/common/security/auth.service';
import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { MatChipInputEvent } from '@angular/material';
import { ClinicaService } from '../../clinica/clinica.service';
import { MedicoService } from '../../medico/medico.service';
import { Medico } from '../../medico/medico.model';

@Component({
    selector: 'app-cadastro-consulta',
    templateUrl: './cadastro-consulta.component.html',
    styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit{

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    private consulta: Consulta;

    private hora_consulta   : string;
    private nome_clinica    : string;
    private nome_medico     : string;

    private primeiro_form_group : FormGroup;
    private segundo_form_group  : FormGroup;
    private terceiro_form_group : FormGroup;
    private quarto_form_group   : FormGroup;

    private horarios_disponiveis: string[];
    private options             : string[];
    private clinicas            : string[];
    private medicos             : string[];

    private sintomas_selected       : any[];
    private medicamentos_selected   : any[]
    private doencas_selected        : any[]
    private tipoConsultaOptions     : any[];
    
    constructor (
        private form_builder        : FormBuilder,
        private authService         : AuthService,
        private service             : ConsultaService,
        private clinica_service     : ClinicaService,
        private medico_service      : MedicoService,
        private router              : Router,
        private snack_bar_service   : SnackService
    ) { }

    ngOnInit(){ 

        this.consulta = new Consulta();

        this.options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', 
                        '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', 
                        '14:30', '15:00', '15:30'];

        // this.clinicas = ['São Judas Tadeu', 'Vital Brazil'];

        this.clinica_service.findAll().then((clinicas: any[]) => {
            this.clinicas = clinicas;
        })

        this.medico_service.findAll().then((medicos: any[]) => {
            this.medicos = medicos;
        })

        // this.medicos = ['André M. S. N.', 'Leonam T. V.'];

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
                this.nome_clinica,
                [
                    Validators.required
                ]
            ],
            medico: [
                this.nome_medico,
                [
                    Validators.required
                ]
            ]
        })

        this.hora_consulta = null;

        this.sintomas_selected = [];
        this.medicamentos_selected = [];
        this.doencas_selected = [];

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

    public add_sintoma(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.sintomas_selected.push({ name : value.trim() })
        }

        if ( input ) {
            input.value = '';
        }
    }

    public remove_sintomas(sintoma) {
        const index = this.sintomas_selected.indexOf(sintoma);
        
        if ( index >= 0 ) {
            this.sintomas_selected.splice(index, 1);
        }
    }

    public add_medicamento(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.medicamentos_selected.push({ name : value.trim() })
        }

        if ( input ) {
            input.value = '';
        }
    }

    public remove_medicamentos(medicamento) {
        const index = this.medicamentos_selected.indexOf(medicamento);
        
        if ( index >= 0 ) {
            this.medicamentos_selected.splice(index, 1);
        }
    }

    public add_doenca(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.doencas_selected.push({ name : value.trim() })
        }

        if ( input ) {
            input.value = '';
        }
    }

    public remove_doencas(doenca) {
        const index = this.doencas_selected.indexOf(doenca);
        
        if ( index >= 0 ) {
            this.doencas_selected.splice(index, 1);
        }
    }

    get medico () {
        return this.primeiro_form_group.get('medico').value;
    }

    get clinica () {
        return this.primeiro_form_group.get('clinica').value;
    }

    get data () {
        return this.segundo_form_group.get('data').value;
    }

    get horario () {
        return this.segundo_form_group.get('horario').value;
    }

    get tipoConsulta () {
        let tp: any[] = this.tipoConsultaOptions.filter((tpc) => {
            return tpc.value == this.terceiro_form_group.get('tipoConsulta').value;
        });

        return ( tp.length > 0 ) ? tp[0]['label'] : undefined;
    }

    get sintomasObservados () {
        return this.terceiro_form_group.get('sintomasObservados').value;
    }

    get medicamentosQueToma () {
        return this.quarto_form_group.get('medicamentosQueToma').value;
    }

    get doencasRecentes () {
        return this.quarto_form_group.get('doencasRecentes').value;
    }

    get informacoesAdicionais () {
        return this.quarto_form_group.get('informacoesAdicionais').value;
    }

    salvar () {
        
        let h = /([0-9]+(?=:))/g.exec(this.horario);
        let m = /(?<=:)([0-9]+)/g.exec(this.horario);

        let user = this.authService.usuarioLogado.value.usuario;

        let consulta_cadastrada = new Consulta(
            new Date(),
            new Date(),
            new Usuario({
                _id         : user._id,
                nome        : user.nome,
                email       : user.email,
                fotoUrl     : user.fotoUrl,
                jwt         : null,
                telefone    : user.telefone,
                tipo        : 0,
                qtConsultas : 0 }),
            this.tipoConsulta,
            this.sintomas_selected,
            this.medicamentos_selected,
            this.doencas_selected,
            this.informacoesAdicionais
        );

        consulta_cadastrada.dataConsulta.setHours(Number(h[0]), Number(m[0]), 0)

        console.log(consulta_cadastrada);

    }

}
