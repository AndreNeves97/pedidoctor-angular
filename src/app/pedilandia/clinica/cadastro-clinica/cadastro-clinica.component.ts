import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { SnackComponent } from '../../../common/utils/snack/snack.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro-clinica',
  templateUrl: './cadastro-clinica.component.html',
  styleUrls: ['./cadastro-clinica.component.scss']
})
export class CadastroClinicaComponent implements OnInit {

  private cadastroForm: FormGroup;

  private clinica: Clinica;

  constructor(
    private fb: FormBuilder,
    private service: ClinicaService,
    private snack_bar: MatSnackBar
  ) { }

  ngOnInit() {
    
    this.clinica = new Clinica();

    this.cadastroForm = this.fb.group({
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
    return this.cadastroForm.get('nome');
  }

  get endereco () {
    return this.cadastroForm.get('endereco');
  }

  limpar () {
    this.cadastroForm.reset();
  }

  cadastrar () {
    const form_value = this.cadastroForm.value;
    this.clinica = new Clinica(form_value.nome, form_value.endereco);
    this.service.insert(this.clinica).then((data) =>{
      this.open_snack_bar( 'Clínica cadastrada!', 'success' );
      this.limpar();
    }).catch(error => {
      this.open_snack_bar( 'Clínica não cadastrada. Algum erro ocorreu', 'danger' );
    });
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
