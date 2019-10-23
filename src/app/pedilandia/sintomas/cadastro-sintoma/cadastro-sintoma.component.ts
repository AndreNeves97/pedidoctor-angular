import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SintomaService } from '../sintoma.service';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Sintoma } from '../sintoma.model';

@Component({
  selector: 'app-cadastro-sintoma',
  templateUrl: './cadastro-sintoma.component.html',
  styleUrls: ['./cadastro-sintoma.component.scss']
})
export class CadastroSintomaComponent implements OnInit {

  private cadastro_form: FormGroup;

  private sintoma: Sintoma;

  constructor(
    private form_builder        : FormBuilder,
    private service             : SintomaService,
    private router              : Router,
    private snack_bar_service   : SnackService
  ) { }

  ngOnInit() { 

    this.sintoma = new Sintoma();

    this.cadastro_form = this.form_builder.group({
      nome: [
        this.sintoma.nome,
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      descricao: [
        this.sintoma.descricao,
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ]
    });

  }

  get nome () {
    return this.cadastro_form.get('nome').value;
  }

  get descricao () {
    return this.cadastro_form.get('descricao').value;
  }

  limpar () {
    this.cadastro_form.reset();
  }

  cadastrar () {
    const form_value = this.cadastro_form.value;
    this.sintoma = new Sintoma(form_value.nome, form_value.descricao);
    this.service.insert( this.sintoma ).then((data) => {
      this.snack_bar_service
          .open_snack_bar('Sintoma cadastrado!', 'success');
      this.limpar();
    }).catch((error)=>{
      this.snack_bar_service
          .open_snack_bar('Sintoma não cadastrado. Algum erro ocorreu!', 'danger');
    });
  }

}
