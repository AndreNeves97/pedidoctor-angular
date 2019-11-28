import { UsuarioService } from './../usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
    private loading : boolean;
    private waiting : boolean;
    private updating : boolean;

    private cadastro_form: FormGroup;
    

    private telefone_mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


    nomeInput : ElementRef;

    @ViewChild('nome', {static: false})
    set _nomeInput(content: ElementRef) {
        this.nomeInput = content;
    }

    nome : FormControl;
    email : FormControl;
    telefone : FormControl;
    senha : FormControl;
    isPaciente : FormControl;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private form_builder: FormBuilder,
        private usuarioService: UsuarioService,
        private snack_bar_service: SnackService
    ) {
        this.updating = true;
        this.loading = true;
    }

    ngOnInit() {
        this.cadastro_form = this.form_builder.group({
            _id: [],
            nome: [
                "", [ Validators.required ]
            ],
            email: [
                "", [ Validators.email, Validators.required]
            ],
            telefone: [
                "", []
            ],
            senha: [
                "", [Validators.required, Validators.minLength(6)]
            ],
            isPaciente: [
                true, [ Validators.required ]
            ]
        });

        Object.entries(this.cadastro_form.controls).forEach((v) => {
            this[ v[0] ] = v[1];
        });


        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return of(params.get('id'));
                })
            )
            .subscribe((id: string) => {
                console.log(id)
                if(id != null) {
                    this.updating = true;
                    this.loading = true;

                    this.usuarioService.getUser(id).then((obj: Usuario) => {
                        this.loading = false;
                        console.log(obj)
                        this.cadastro_form.patchValue(obj);
                        this.cadastro_form.get('senha').setValidators([Validators.minLength(6)])
                    })
                } else {
                    this.cadastro_form.get('senha').setValidators([Validators.required, Validators.minLength(6)])
                    this.updating = false;
                    this.loading = false;
                }

            });
    }


    public limpar() {
        this.cadastro_form.reset();
    }

    private salvar() {
        const usuario : Usuario = this.cadastro_form.value;

        this.waiting = true;

        console.log(usuario);

        if(this.updating) {
            this.alterar(usuario)
        } else {
            this.cadastrar(usuario) 
        }
    }

    cadastrar(usuario : Usuario) {
        this.usuarioService.insert(usuario).then((dado) => {
            this.waiting = false;
            if (dado) {
                this.snack_bar_service
                    .open_snack_bar('Usuario cadastrado!', 'success');

                this.limpar();
                this.nomeInput.nativeElement.focus();
            } else {
                this.snack_bar_service
                .open_snack_bar('Falha ao cadastrar usuário. Algum erro ocorreu.', 'error');
            }
        }).catch((e) => {
            console.log(e);
            let msg = 'Falha ao cadastrar usuário. Algum erro ocorreu.';

            if(e == 'email-existente') {
                msg = 'Email já cadastrado, digite outro.'
            }
            
            this.waiting = false;
            this.snack_bar_service
            .open_snack_bar(msg, 'error');
        });
    }

    alterar(usuario : Usuario) {
        this.usuarioService.updateUsuario(usuario).then((dado) => {
            this.waiting = false;
            if (dado) {
                this.snack_bar_service
                    .open_snack_bar('Usuario salvo!', 'success');

                this.navigate_back();
            } else {
                this.snack_bar_service
                .open_snack_bar('Falha ao salvar usuário. Algum erro ocorreu.', 'error');
            }
        }).catch((e) => {
            console.log(e);
            let msg = 'Falha ao salvar usuário. Algum erro ocorreu.';

            if(e == 'email-existente') {
                msg = 'Email já cadastrado, digite outro.'
            }
            
            this.waiting = false;
            this.snack_bar_service
            .open_snack_bar(msg, 'error');
        });
    }

    navigate_back() {
        history.back();
    }
}
