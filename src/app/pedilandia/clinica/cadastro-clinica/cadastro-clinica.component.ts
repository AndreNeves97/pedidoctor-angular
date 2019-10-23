import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-cadastro-clinica',
  templateUrl: './cadastro-clinica.component.html',
  styleUrls: ['./cadastro-clinica.component.scss']
})
export class CadastroClinicaComponent implements OnInit {

  private cadastro_form: FormGroup;

  private clinica: Clinica;

  constructor(
    private form_builder:      FormBuilder,
    private service:           ClinicaService,
    private snack_bar_service: SnackService,
    private router:            Router
  ) { }

  ngOnInit() {
    
    this.clinica = new Clinica();

    this.cadastro_form = this.form_builder.group({
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

  get nome () {
    return this.cadastro_form.get('nome');
  }

  get endereco () {
    return this.cadastro_form.get('endereco');
  }

  limpar () {
    this.cadastro_form.reset();
  }

  cadastrar () {
    const form_value = this.cadastro_form.value;
    this.clinica = new Clinica(form_value.nome, form_value.endereco);
    this.service.insert(this.clinica).then((data) =>{
      this.snack_bar_service.open_snack_bar( 'Clínica cadastrada!', 'success' );
      this.limpar();
      this.navigate_back();
    }).catch(error => {
      this.snack_bar_service.open_snack_bar( 'Clínica não cadastrada. Algum erro ocorreu', 'danger' );
    });
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/clinica']);
  }

}
