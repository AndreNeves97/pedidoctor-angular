import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { SnackComponent } from '../../../common/utils/snack/snack.component';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-clinica',
  templateUrl: './update-clinica.component.html',
  styleUrls: ['./update-clinica.component.scss']
})
export class UpdateClinicaComponent implements OnInit {

  private cadastroForm: FormGroup;

  private clinica: Clinica;

  constructor(
    private fb: FormBuilder,
    private service: ClinicaService,
    private snack_bar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
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

    this.cadastroForm = this.fb.group({
      _id: this.clinica.nome, 
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
    this.cadastroForm.patchValue({
      _id : this.clinica.nome ? this.clinica._id : "",
      nome : this.clinica.nome ? this.clinica.nome : "",
      endereco: this.clinica.endereco ? this.clinica.endereco : ""
    });
  }

  get _id () {
    return this.cadastroForm.get('_id');
  }

  get nome () {
    return this.cadastroForm.get('nome');
  }

  get endereco () {
    return this.cadastroForm.get('endereco');
  }

  limpar () {
    this.cadastroForm.reset();
  }

  atualizar () {
    const form_value = this.cadastroForm.value;
    this.clinica = new Clinica(
          form_value.nome, 
          form_value.endereco,
          form_value._id);
    this.service.updateClinica(this.clinica).then((data) =>{
      if ( data ) {
        this.open_snack_bar( 'Clínica atualizada!', 'success' );
        this.limpar();
        this.navigate_back();
      } else {
        throw "Erro ao atualizar"
      }
    }).catch(error => {
      this.open_snack_bar( 'Clínica não atualizada. Algum erro ocorreu', 'danger' );
    });
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/clinica']);
  }

  open_snack_bar ( message: string, gravidade: string ) {
    this.snack_bar.openFromComponent( SnackComponent, {
      data:  { 
        message, 
        style: gravidade,
      }, 
      duration: 5000
    });
  }
}
