import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, NgControlStatus } from '@angular/forms';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { ReportagemConsulta } from '../reportagem-consulta.model';
import { Diagnostico } from 'src/app/pedilandia/diagnostico/diagnostico.model';
import { ReportagemConsultaService } from '../../reportagem-consulta.service';
import { Observable } from 'rxjs';
import { startWith, map, tap, filter } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

class Option {
    value: string
    type: string
    query? : string
    matchInfo? : any;
}

@Component({
    selector: 'app-diagnostico-consulta',
    templateUrl: './diagnostico-consulta.component.html',
    styleUrls: ['./diagnostico-consulta.component.scss']
})
export class DiagnosticoConsultaComponent implements OnInit {

    private form: FormGroup;
    private _consulta: Consulta;


    lastDescricaoValue : string;
    descricaoInput : ElementRef;


    defaultOptions : Option[] = [
        {type: 'sintoma', value: 'Dor de cabeça',},
        {type: 'sintoma', value: 'Dor de barriga'},
        {type: 'sintoma', value: 'Dor de coluna'},
        {type: 'doenca', value: 'Enxaqueca'},
        {type: 'doenca', value: 'Cifose'},
        {type: 'doenca', value: 'Escoliose'},

    ];


    acentReplace = [
        ['á', 'a'],
        ['ã', 'a'],
        ['â', 'a'],
        ['à', 'a'],
        ['é', 'e'],
        ['ẽ', 'e'],
        ['ê', 'e'],
        ['è', 'e'],
        ['í', 'i'],
        ['ĩ', 'i'],
        ['î', 'i'],
        ['ì', 'i'],
        ['ó', 'o'],
        ['õ', 'o'],
        ['ô', 'o'],
        ['ò', 'o'],
        ['ú', 'u'],
        ['ũ', 'u'],
        ['û', 'u'],
        ['ù', 'u'],
        ['ç', 'c'],
    ]
    
    maxWords;

    options: Observable<Option[]>;


    @ViewChild('descricao', {static : false})
    set _descricaoInput(content) {
        this.descricaoInput = content;
    }

    constructor(
        private service: ReportagemConsultaService
    ) { }

    ngOnInit() {
        this.maxWords = 1;

        this.defaultOptions.forEach(v => {
            const num = v.value.split(' ').length;

            this.maxWords = Math.max(this.maxWords, num);

            this.acentReplace.forEach(accent => {
                v.query = v.value.replace(accent[0], accent[1]);
            })

        });


        this.options = this.form.get('descricao').valueChanges.pipe(
            startWith(''),
            filter(v => typeof v == 'string'),
            map(v => this._filter(v))
        );
    }

    _filter(v) : Option[] {
        this.lastDescricaoValue = v;

        let pattern = new RegExp(`(\\b([a-zA-Z0-9\u00C0-\u017F]+)\\W*){${ this.maxWords }}$`)

        const match = v.match(pattern);


        if(match != null) {
            let filtered : Option[] = [];


            this.defaultOptions.forEach(v => {
                let last : string = match[0];

                this.acentReplace.forEach(v => {
                    last = last.replace(v[0], v[1]);
                })


                let tokens = last.split('\n');
                let lastLine = tokens[ tokens.length - 1 ];
                

                let matched = false;

                tokens = lastLine.split(' ').filter(v => v != '');
                
                let i;
                
                for(i = 0; i < tokens.length; i++) {
                    const test = tokens.slice(i, tokens.length).join(' ')
                    
                        
                    if(v.query.toLowerCase().startsWith(test.toLowerCase())) {
                        matched = true;
                        break;
                    }
                }

                
                if(matched) {
                    filtered.push({
                        value: v.value,
                        type: v.type,
                        query: v.query,
                        matchInfo: {
                            maxIndex: -(tokens.length - i - 1)
                        }
                    })
                }
            });

            return filtered;
        } else {
            return [];
        }
    }

    selected($event) {
        const option : Option = $event.option.value;

        let textValue = this.lastDescricaoValue;

        let breaklineTokens = textValue.split('\n');

        let tokens = breaklineTokens[ breaklineTokens.length - 1 ].split(' ').filter(v => v != '');

        textValue = 
            breaklineTokens.slice(0, breaklineTokens.length - 1).join('\n') +  '\n' +
            tokens.slice(0, tokens.length + option.matchInfo.maxIndex - 1).join(' ') + ' ' +  
            option.value;

        this.form.setValue({descricao: textValue});


        console.log(option);
    }

    public focusDescricaoInput() {
        setTimeout(() => this.descricaoInput.nativeElement.focus(), 200)
    }

    @Input()
    set form_group(form: FormGroup) {
        this.form = form;
    }

    @Input()
    set consulta(consulta: Consulta) {
        this._consulta = consulta;
        this._consulta.reportagemConsulta = new ReportagemConsulta();
        this._consulta.reportagemConsulta.diagnostico = new Diagnostico();
        if (this.form) {
            let today = new Date();

            let hours : any = today.getHours();
            let minutes : any = today.getMinutes();

            if(hours < 10) {
                hours = `0${hours}`;
            }
            if(minutes < 10) {
                minutes = `0${minutes}`;
            }


            this.form.patchValue({
                descricao:
                    `Data: ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}
Consulta iniciada em: ${ hours }h${ hours }
------------------------------------------------
Médico: ${ this._consulta.medico.nome}
Paciente: ${ this._consulta.paciente.nome}
------------------------------------------------
Descrição do diagnóstico:

`            })
            this._consulta.reportagemConsulta.diagnostico.descricao = this.form.get('descricao').value;
        }
    }

  get descricao () {
    return this.form.get('descricao').value;
  }

  get paciente () {
    if ( this._consulta )
      return this._consulta.paciente;
    return null
  }

  update_bloc_object() {
    this._consulta.reportagemConsulta.diagnostico.descricao = this.descricao;
    this.service.set_descricao_diagnostico(this._consulta);
  }

}
