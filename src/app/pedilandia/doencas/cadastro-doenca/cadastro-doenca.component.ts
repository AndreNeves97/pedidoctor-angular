import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doenca } from '../doenca.model';
import { Sintoma } from '../../sintomas/sintoma.model';
import { DoencaService } from '../doenca.service';
import { SintomaService } from '../../sintomas/sintoma.service';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-cadastro-doenca',
  templateUrl: './cadastro-doenca.component.html',
  styleUrls: ['./cadastro-doenca.component.scss']
})
export class CadastroDoencaComponent implements OnInit {

  private cadastro_form: FormGroup;

  private doenca: Doenca;

  private sintomas_select: any[];

  constructor (
    private form_builder        : FormBuilder,
    private service             : DoencaService,
    private sintomas_service    : SintomaService,
    private snack_bar_service   : SnackService
  ) { }

  ngOnInit() {

    this.doenca = new Doenca();

    this.sintomas_select = [];

    this.cadastro_form = this.form_builder.group({
      nome: [
        this.doenca.nome,
        [ 
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      descricao: [
        this.doenca.descricao,
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],
      sintomas: [
        this.doenca.sintomas
      ]
    });

    setTimeout(() => {
      this.sintomas_service.findAll()
          .then((sintomas: Sintoma[]) => {
            if ( sintomas ) {
              this.sintomas_select = sintomas.map((sintoma) => {
                return {
                  value : sintoma._id,
                  viewValue : sintoma.nome
                }
              })
            }
          });
    }, 100)

  }

  get nome () {
    return this.cadastro_form.get('nome');
  }

  get descricao () {
    return this.cadastro_form.get('descricao');
  }

  limpar ( ) {
    this.cadastro_form.reset();
  }

  cadastrar ( ) {
    const form_value = this.cadastro_form.value;

    this.doenca = new Doenca(
      form_value.nome,
      form_value.descricao,
      form_value.sintomas
    );

    this.service.insert( this.doenca ).then((data) => {
      this.snack_bar_service
          .open_snack_bar('Doença cadastrada!', 'success');
      this.limpar();
    }).catch((error) => {
      this.snack_bar_service
          .open_snack_bar('Doença não cadastrada. Algum erro ocorreu|', 'danger');
    })
  }

}
