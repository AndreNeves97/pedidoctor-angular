import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doenca } from '../doenca.model';
import { DoencaService } from '../doenca.service';
import { SintomaService } from '../../sintomas/sintoma.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Sintoma } from '../../sintomas/sintoma.model';

@Component({
  selector: 'app-update-doenca',
  templateUrl: './update-doenca.component.html',
  styleUrls: ['./update-doenca.component.scss']
})
export class UpdateDoencaComponent implements OnInit {

  private update_form: FormGroup;

  private doenca: Doenca;

  private sintomas_select: any[];

  constructor(
    private form_builder        : FormBuilder,
    private service             : DoencaService,
    private sintomas_service    : SintomaService,
    private router              : Router,
    private route:                ActivatedRoute,
    private snack_bar_service   : SnackService
  ) { 
    
    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        )
        .subscribe((id: string) => {
          this.service.find(id).then((doenca: Doenca) => {
            this.doenca = doenca;
            if ( !doenca ) this.navigate_back();
            else this.set_values();
          })
        })

  }

  ngOnInit() {

    this.doenca = new Doenca();

    this.sintomas_select = [];

    this.update_form = this.form_builder.group({
      _id: this.doenca._id,
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

  set_values () {
    let sint: any[] = [];
    this.doenca.sintomas.forEach((d) => sint.push(d._id));
    this.update_form.patchValue({
      _id: this.doenca._id ? this.doenca._id : "",
      nome : this.doenca.nome ? this.doenca.nome : "",
      descricao : this.doenca.descricao ? this.doenca.descricao : "",
      sintomas : this.doenca.sintomas ? sint : []
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

  limpar () {
    this.update_form.reset();
  }

  atualizar () {
    const form_value = this.update_form.value;

    this.doenca = new Doenca (
      form_value.nome,
      form_value.descricao,
      form_value.sintomas,
      form_value._id
    );

    this.service.update(this.doenca).then((data) => {

      if ( data ) {

        this.snack_bar_service
            .open_snack_bar('Doença atualizada!', 'success');
        this.limpar();
        this.navigate_back();

      } else {
        throw 'Erro ao atualizar';
      }

    }).catch((error) => {
      this.snack_bar_service
          .open_snack_bar('Doença não atualizada. Algum erro ocorreu!', 'danger');
    });
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/doenca']);
  }

}
