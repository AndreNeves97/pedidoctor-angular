import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';
import { DoencaService } from '../../doencas/doenca.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Doenca } from '../../doencas/doenca.model';

@Component({
  selector: 'app-cadastro-medicamento',
  templateUrl: './cadastro-medicamento.component.html',
  styleUrls: ['./cadastro-medicamento.component.scss']
})
export class CadastroMedicamentoComponent implements OnInit {

  private cadastro_form: FormGroup;

  private medicamento: Medicamento;

  private doencas_select: any[];

  constructor(
    private form_builder          : FormBuilder,
    private service               : MedicamentoService,
    private doencas_service       : DoencaService,
    private snack_bar_service     : SnackService
  ) { }

  ngOnInit() {

    this.medicamento = new Medicamento();

    this.doencas_select = [];

    this.cadastro_form = this.form_builder.group({
      nome: [
        this.medicamento.nome,
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      descricao: [
        this.medicamento.descricao,
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],
      indicadoPara: [
        this.medicamento.indicadoPara
      ]
    });

    setTimeout(() => {
      this.doencas_service.findAll()
          .then((doencas: Doenca[]) => {
            if ( doencas ) {
              this.doencas_select = doencas.map((doenca) => {
                return {
                  value : doenca._id,
                  viewValue : doenca.nome
                }
              })
            }
          })
    }, 100)
    
  }

    get nome () {
      return this.cadastro_form.get('nome')
    }

    get descricao () {
      return this.cadastro_form.get('descricao')
    }

    limpar () {
      this.cadastro_form.reset();
    }

    cadastrar () {

      const form_value = this.cadastro_form.value;

      this.medicamento = new Medicamento();
      this.medicamento.nome         = form_value.nome;
      this.medicamento.descricao    = form_value.descricao;
      this.medicamento.indicadoPara = form_value.indicadoPara;

      this.service.insert( this.medicamento ).then((data) => {
        this.snack_bar_service
            .open_snack_bar('Medicamento cadastrado!', 'success');
        this.limpar();
      }).catch((error) => {
        this.snack_bar_service
            .open_snack_bar('Medicamento não cadastrado. Algum erro ocorreu!', 'danger');
      });

    }

}
