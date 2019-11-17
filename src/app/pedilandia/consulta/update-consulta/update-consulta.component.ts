import { AuthService } from 'src/app/common/security/auth.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Consulta, HorarioConsultaSelecao } from './../consulta.model';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { ConsultaService } from '../consulta.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { ClinicaService } from '../../clinica/clinica.service';
import { MedicoService } from '../../medico/medico.service';
import { ConsultaTipoService } from '../../consulta-tipo/consulta-tipo.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { Sintoma } from '../../sintomas/sintoma.model';
import { SintomaService } from '../../sintomas/sintoma.service';

@Component({
  selector: 'app-update-consulta',
  templateUrl: './update-consulta.component.html',
  styleUrls: ['./update-consulta.component.scss']
})
export class UpdateConsultaComponent implements OnInit {

    private visible = true;
    private selectable = true;
    private removable = true;
    private addOnBlur = false;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    private consulta: Consulta;

    private hora_consulta   : string;
    private nome_clinica    : string;
    private nome_medico     : string;

    sintomasCtrl = new FormControl();
    filteredSintomas: BehaviorSubject<Sintoma[]>;
    allSintomas: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('sintomasInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('autoCompleteSintomas', {static: false}) matAutocomplete: MatAutocomplete;
    
    private primeiro_form_group : FormGroup;
    private segundo_form_group  : FormGroup;
    private terceiro_form_group : FormGroup;
    private quarto_form_group   : FormGroup;

    private horarios_disponiveis: string[];
    private options             : HorarioConsultaSelecao[];
    private clinicas            : any[];
    private medicos             : any[];

    private sintomas_selected       : Sintoma[];
    private medicamentos_selected   : any[]
    private doencas_selected        : any[]
    private tipoConsultaOptions     : any[];

    private clinicasLoaded          : boolean;
    private tiposConsultasLoaded    : boolean;

    private medicosLoading          : boolean;
    private horariosLoading         : boolean;
    private sintomasLoading         : boolean;
    

    constructor (
        private form_builder        : FormBuilder,
        private authService         : AuthService,
        private service             : ConsultaService,
        private clinica_service     : ClinicaService,
        private consultaT_service   : ConsultaTipoService,
        private medico_service      : MedicoService,
        private sintoma_service     : SintomaService,
        private router              : Router,
        private route               : ActivatedRoute,
        private snack_bar_service   : SnackService,
        private changeDetectorRef   : ChangeDetectorRef
    ) { 
      
      this.route.paramMap
          .pipe(
            switchMap((params: ParamMap) => {
              return of(params.get('id'))
            })
          ).subscribe((id: string) => {
            this.service.find(id).then((consulta: Consulta) => {
              this.consulta = consulta;
              if( !consulta ) this.navigate_back();
              else this.set_values(consulta);
            })
          })

    }

    ngOnInit(){ 

        this.consulta = new Consulta();

        this.tipoConsultaOptions = [];
        this.medicos = [];
        this.clinicas = [];

        this.medicosLoading = false;
        this.horariosLoading = false;
        this.sintomasLoading = false;

        this.options = [];

        this.loadClinicas();
        this.loadTiposConsultas();

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
                this.consulta.tipoConsulta.nome,
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
                this.consulta.clinica.nome,
                [
                    Validators.required,
                    Validators.minLength(1)
                ]
            ],
            medico: [
                this.consulta.medico.nome,
                [
                    Validators.required,
                    Validators.minLength(1)
                ]
            ]
        })

        this.hora_consulta = null;

        this.sintomas_selected = [];
        this.medicamentos_selected = [];
        this.doencas_selected = [];


        this.primeiro_form_group.get('clinica').valueChanges.subscribe(v => this.check_medico_clinica())

        this.filteredSintomas = new BehaviorSubject<Sintoma[]>(null);
        
        this.sintomasCtrl.valueChanges.pipe(
            tap(v => {
                this.filteredSintomas.next(null);
                this.sintomasLoading = true;
            }),
            debounceTime(400),
            tap(v => this.sintomasLoading = false),
            distinctUntilChanged(),
            tap(v => this.loadSintomas(v))
        ).subscribe();
    }

    stepChange($event) {
        if($event.selectedIndex == 1) {
            this.loadHorarios();
        } else if($event.selectedIndex == 2) {
            this.loadSintomas("");
        }
    }

    loadClinicas() {
        this.clinicas = [];
        this.clinicasLoaded = false;

        this.clinica_service.findAll().then((clinicas: any[]) => {
            this.clinicas = clinicas;
            this.clinicasLoaded = true;
            this.changeDetectorRef.detectChanges();
        });
    }

    loadMedicos() {
        this.medicos = [];
        this.medicosLoading = true;


        this.primeiro_form_group.get('medico').setValue(null);

        const clinica = this.primeiro_form_group.get('clinica').value;

        this.medico_service.findByClinica(clinica).then((medicos: any[]) => {
            // Só pra forçar um tempo e mostrar o efeito de carregamento 
            setTimeout(() => {
                this.medicos = medicos;
                this.medicosLoading = false;
            }, 200)
        })
    }

    async loadTiposConsultas() {
        this.tipoConsultaOptions = [];
        this.tiposConsultasLoaded = false;

        this.consultaT_service.findAll().then((consultasT: any[]) => {
            this.tipoConsultaOptions = consultasT.map((consT) => {
                return {
                    label : consT.nome,
                    value : consT.nome,
                    content : consT
                }
            })

            this.tiposConsultasLoaded = true;
            this.changeDetectorRef.detectChanges();
        })
    }

    async loadHorarios() {
        this.options = [];
        this.horariosLoading = true;

        let lastValue = this.segundo_form_group.get('horario').value;
        this.segundo_form_group.get('horario').setValue(null);

        
        const date : Date = this.segundo_form_group.get('data').value;

        if(date == null) {
            this.horariosLoading = false;
            return null;
        }

        let month : any = date.getMonth() + 1;
        if(month < 10)
            month = `0${month}`;

        let day : any = date.getDate();
        if(day < 10)
            day = `0${day}`;

        const fmtDate = `${ date.getFullYear() }-${ month }-${ day}`;

        this.service.getDisponibilidadeHorarios(fmtDate).then((horarios: HorarioConsultaSelecao[]) => {

            // Só pra forçar um tempo e mostrar o efeito de carregamento 
            setTimeout(() => {
                this.options = horarios;
                
                if(lastValue != undefined) {
                    const lastValueIndex = this.options.findIndex(v => v.horario === lastValue);
                    
                    let newValueSet = null;

                    if(lastValueIndex > -1 && this.options[ lastValueIndex ].disponivel) {
                        newValueSet = lastValue;
                    } else {
                        for(let i = lastValueIndex - 1; i >= 0; i--) {
                            if(this.options[i].disponivel ) {
                                newValueSet = this.options[i].horario;
                                break;
                            }
                        }

                        if(newValueSet == null) {
                            for(let i = lastValueIndex + 1; i < this.options.length; i++) {
                                if(this.options[i].disponivel ) {
                                    newValueSet = this.options[i].horario;
                                    break;
                                }
                            }
                        }
                    }

                    if(newValueSet != null)
                        this.segundo_form_group.get('horario').setValue(newValueSet);
                }
    
                this.horariosLoading = false;
            }, 200)
        })
    }

    async loadSintomas(query : string) {
        this.sintomasLoading = true;

        const itens = await this._filterSintomas(query);

        this.filteredSintomas.next(itens);
        this.sintomasLoading = false;
    }

    filter_date = (d: Date): boolean => {

        const date = new Date();

        date.setDate(new Date().getDate() - 1);

        return d >= date && d.getDay() != 0;

    }

    private set_values ( consulta: Consulta ): void {
      this.primeiro_form_group.patchValue({
        clinica : consulta.clinica.nome,
        medico  : consulta.medico.nome
      });

      this.segundo_form_group.patchValue({
        data    : consulta.dataConsulta,
        horario : `${consulta.dataConsulta.getHours()}:${consulta.dataConsulta.getMinutes()}`
      });

      this.terceiro_form_group.patchValue({
        tipoConsulta : consulta.tipoConsulta.nome,
        sintomasObservados : consulta.sintomasObservados
      });

      this.quarto_form_group.patchValue({
        medicamentosQueToma : consulta.medicamentosQueToma,
        doencasRecentes : consulta.doencasRecentes,
        informacoesAdicionais : consulta.informacoesAdicionais
      });
    }

    private date_change() {
        if ( this.segundo_form_group.get('data').valid ) {
            this.loadHorarios();
        } else {
            this.options = [];
        }
    }

    private check_medico_clinica() {
        if ( this.primeiro_form_group.get('clinica').valid ) {
            this.loadMedicos();
        } else {
            this.medicos = [];
        }
    }

    public add_sintoma_select_array(value : Sintoma) {
        if(this.sintomas_selected.filter(v => v.nome == value.nome).length == 0) {
            this.sintomas_selected.push(value)
        }
    }

    public add_sintoma(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.add_sintoma_select_array({nome: value, _id: null});
        }

        if ( input ) {
            input.value = '';
        }

            
        this.sintomasCtrl.setValue(null);

        this.terceiro_form_group.patchValue({
            sintomasObservados : this.sintomas_selected
        })
    }

    public remove_sintomas(sintoma : Sintoma) {
        const index = this.sintomas_selected.findIndex(v => v.nome == sintoma.nome);
        
        if ( index >= 0 ) {
            this.sintomas_selected.splice(index, 1);
        }

        this.terceiro_form_group.patchValue({
            sintomasObservados : this.sintomas_selected
        })
    }


    sintomaSelected(event: MatAutocompleteSelectedEvent): void {
        this.add_sintoma_select_array({
            _id: event.option.value,
            nome: event.option.viewValue,
        });

        this.fruitInput.nativeElement.value = '';
        this.sintomasCtrl.setValue(null);
    }

    private async _filterSintomas(value: string): Promise<Sintoma[]>{
        if(value == null) 
            return [];            
            
        const filterValue = value.toLowerCase();
        
        return await this.sintoma_service.findAll('_id,nome', filterValue);
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

        this.quarto_form_group.patchValue({
            medicamentosQueToma : this.medicamentos_selected
        });

    }

    public remove_medicamentos(medicamento) {
        const index = this.medicamentos_selected.indexOf(medicamento);
        
        if ( index >= 0 ) {
            this.medicamentos_selected.splice(index, 1);
        }

        this.quarto_form_group.patchValue({
            medicamentosQueToma : this.medicamentos_selected
        });
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

        this.quarto_form_group.patchValue({
            doencasRecentes : this.doencas_selected
        });
    }

    public remove_doencas(doenca) {
        const index = this.doencas_selected.indexOf(doenca);
        
        if ( index >= 0 ) {
            this.doencas_selected.splice(index, 1);
        }

        this.quarto_form_group.patchValue({
            doencasRecentes : this.doencas_selected
        });
    }

    get medico () {
        return this.primeiro_form_group.get('medico').value;

        // if ( this.medicos.length > 0 ) {
        //     return this.medicos.filter(medico => {
        //         return medico.nome == this.primeiro_form_group.get('medico').value;
        //     })[0]
        // } else 
        //     return null
    }

    get clinica () {
        return this.primeiro_form_group.get('clinica').value;

        // if ( this.clinicas.length > 0 ) {
        //     return this.clinicas.filter(clinica => {
        //         return clinica.nome == this.primeiro_form_group.get('clinica').value;
        //     })[0]
        // } else 
        //     return null
    }

    get data () {
        return this.segundo_form_group.get('data').value;
    }

    get horario () {
        return this.segundo_form_group.get('horario').value;
    }

    get tipoConsulta () {
        if ( this.tipoConsultaOptions.length > 0 ) {
            let tipo =  this.tipoConsultaOptions.filter(tpCons => {
                return tpCons.label == this.terceiro_form_group.get('tipoConsulta').value;
            })[0]
            if (tipo) {
                return tipo.content;
            } else 
                return null;
        } else 
            return null
    }

    get sintomasObservados () {
        return ( this.terceiro_form_group.get('sintomasObservados').value == null ) ? [] : this.terceiro_form_group.get('sintomasObservados').value;
    }

    get medicamentosQueToma () {
        return  ( this.quarto_form_group.get('medicamentosQueToma').value == null) ? [] : this.quarto_form_group.get('medicamentosQueToma').value ;
    }

    get doencasRecentes () {
        return ( this.quarto_form_group.get('doencasRecentes').value == null ) ? [] : this.quarto_form_group.get('doencasRecentes').value;
    }

    get informacoesAdicionais () {
        return this.quarto_form_group.get('informacoesAdicionais').value;
    }

    salvar () {
        
        let h = /([0-9]+(?=:))/g.exec(this.horario);
        let m = /(?<=:)([0-9]+)/g.exec(this.horario);

        let user = this.authService.usuarioLogado.value.usuario;

        let consulta_atualizada = new Consulta(
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
            this.informacoesAdicionais,
            this.clinica,
            this.medico
        );

        consulta_atualizada._id = this.consulta._id;

        consulta_atualizada.dataConsulta.setHours(Number(h[0]), Number(m[0]), 0)

        this.service.update(consulta_atualizada).then((data) => {
            this.snack_bar_service.open_snack_bar('Consulta atualizada', 'success');
            this.primeiro_form_group.reset();
            this.segundo_form_group.reset();
            this.terceiro_form_group.reset();
            this.quarto_form_group.reset();
            this.navigate_back();
        }).catch(error => {
            this.snack_bar_service.open_snack_bar( 'Consulta não atualizada. Algum erro ocorreu', 'danger' );
        })

    }

    navigate_back() {
        this.router.navigate([ '/pedilandia/consultas' ]);
    }

}
