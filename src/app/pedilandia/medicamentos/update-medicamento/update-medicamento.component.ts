import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';
import { DoencaService } from '../../doencas/doenca.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Doenca } from '../../doencas/doenca.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-medicamento',
  templateUrl: './update-medicamento.component.html',
  styleUrls: ['./update-medicamento.component.scss']
})
export class UpdateMedicamentoComponent implements OnInit {

  private update_form: FormGroup;

  private medicamento: Medicamento;

  private doencas_select: any[];

  constructor(
    private form_builder          : FormBuilder,
    private service               : MedicamentoService,
    private doencas_service       : DoencaService,
    private router                : Router,
    private route                 : ActivatedRoute,
    private snack_bar_service     : SnackService
  ) { 

    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((medicamento: Medicamento) => {
            this.medicamento = medicamento;
            if ( !medicamento ) this.navigate_back();
            else this.set_values();
          })
        })

  }

  ngOnInit() {

    this.medicamento = new Medicamento();

    this.doencas_select = [];

    this.update_form = this.form_builder.group({
      _id: [
        this.medicamento._id
      ],
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

  set_values ( ) {
    let doencas: any[] = [];
    this.medicamento.indicadoPara.forEach((d) => doencas.push(d._id));
    console.log(doencas);
    this.update_form.patchValue({
      _id: this.medicamento._id ? this.medicamento._id : "",
      nome : this.medicamento.nome ? this.medicamento.nome : "",
      descricao : this.medicamento.descricao ? this.medicamento.descricao : "",
      indicadoPara : this.medicamento.indicadoPara ? doencas: []
    })
  }

  get _id () {
    return this.update_form.get('_id')
  }

  get nome () {
    return this.update_form.get('nome')
  }

  get descricao () {
    return this.update_form.get('descricao')
  }

  limpar () {
    this.update_form.reset();
  }

  atualizar () {

    const form_value = this.update_form.value;

    this.medicamento = new Medicamento();
    this.medicamento.nome         = form_value.nome;
    this.medicamento.descricao    = form_value.descricao;
    this.medicamento.indicadoPara = form_value.indicadoPara;
    this.medicamento._id          = form_value._id;

    this.service.update(this.medicamento).then((data) => {
      
      if ( data ) { 

        this.snack_bar_service
            .open_snack_bar('Medicamento atualizado!', 'success');
        this.limpar();
        this.navigate_back();

      } else 
        throw 'Erro ao atualizar';
    
    }).catch((error) => {
      this.snack_bar_service
          .open_snack_bar('Medicamento não atualizado. Algum erro ocorreu!', 'danger');
    });

  }

  navigate_back () {
    this.router.navigate(['/pedilandia/medicamento']);
  }

}
