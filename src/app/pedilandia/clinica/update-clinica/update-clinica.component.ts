import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-update-clinica',
  templateUrl: './update-clinica.component.html',
  styleUrls: ['./update-clinica.component.scss']
})
export class UpdateClinicaComponent implements OnInit {

  private update_form: FormGroup;

  private clinica: Clinica;

  constructor(
    private form_builder:       FormBuilder,
    private service:            ClinicaService,
    private snack_bar_service:  SnackService,
    private router:             Router,
    private route:              ActivatedRoute,
  ) { 

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap ) => {
          return of(params.get('id'));
        }))
      .subscribe((id: string) => {
        this.service.find(id).then((clinica: Clinica) => {
          this.clinica = clinica;
          if ( !clinica ) this.navigate_back();
          else this.set_values();
        })
      });

  }

  ngOnInit() {
    
    this.clinica = new Clinica();

    this.update_form = this.form_builder.group({
      _id: this.clinica._id, 
      nome: [ 
        this.clinica.nome, 
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      endereco: [
        this.clinica.endereco,
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]
    });
    
  }

  set_values () {
    this.update_form.patchValue({
      _id : this.clinica._id ? this.clinica._id : "",
      nome : this.clinica.nome ? this.clinica.nome : "",
      endereco: this.clinica.endereco ? this.clinica.endereco : ""
    });
  }

  get _id () {
    return this.update_form.get('_id');
  }

  get nome () {
    return this.update_form.get('nome');
  }

  get endereco () {
    return this.update_form.get('endereco');
  }

  limpar () {
    this.update_form.reset();
  }

  atualizar () {
    const form_value = this.update_form.value;

    this.clinica = new Clinica(
          form_value.nome, 
          form_value.endereco,
          form_value._id);
    
    this.service.updateClinica(this.clinica).then((data) =>{
      
      if ( data ) {
        this.snack_bar_service
            .open_snack_bar( 'Clínica atualizada!', 'success' );
        this.limpar();
        this.navigate_back();
      } else {
        throw "Erro ao atualizar"
      }
    
    }).catch(error => {
      this.snack_bar_service
          .open_snack_bar( 'Clínica não atualizada. Algum erro ocorreu', 'danger' );
    });
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/clinica']);
  }

}
