import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sintoma } from '../sintoma.model';
import { SintomaService } from '../sintoma.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-sintoma',
  templateUrl: './update-sintoma.component.html',
  styleUrls: ['./update-sintoma.component.scss']
})
export class UpdateSintomaComponent implements OnInit {

  private update_form: FormGroup;

  private sintoma: Sintoma;

  constructor(
    private form_builder:         FormBuilder,
    private service:              SintomaService,
    private snack_bar_service:    SnackService,
    private router:               Router,
    private route:                ActivatedRoute
  ) { 

    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((sintoma: Sintoma) => {
            this.sintoma = sintoma;
            if ( !sintoma ) this.navigate_back();
            else this.set_values();
          })
        })

  }

  ngOnInit() {

    this.sintoma = new Sintoma();

    this.update_form = this.form_builder.group({
      _id: this.sintoma._id,
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

  set_values () {
    this.update_form.patchValue({
      _id : this.sintoma._id ? this.sintoma._id : "",
      nome : this.sintoma.nome ? this.sintoma.nome : "",
      descricao : this.sintoma.descricao ? this.sintoma.descricao : ""
    });
  }

  get _id () {
    return this.update_form.get('_id');
  }

  get nome () {
    return this.update_form.get('nome');
  }

  get descricao () {
    return this.update_form.get('descricao');
  }

  limpar() {
    this.update_form.reset();
  }

  atualizar () {
    const form_value = this.update_form.value;

    this.sintoma = new Sintoma(
      form_value.nome,
      form_value.descricao,
      form_value._id
    );

    this.service.update(this.sintoma).then((data) => {

      if ( data ) {

        this.snack_bar_service
            .open_snack_bar('Sintoma atualizado!', 'success');
        this.limpar();
        this.navigate_back();

      } else {
        throw 'Erro ao atualizar';
      }

    }).catch((error) => {
      this.snack_bar_service
          .open_snack_bar('Sintoma não atualizado. Algum erro ocorreu', 'danger');
    })
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/sintoma']);
  }

}
