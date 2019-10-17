import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';

@Component({
  selector: 'app-cadastro-clinica',
  templateUrl: './cadastro-clinica.component.html',
  styleUrls: ['./cadastro-clinica.component.scss']
})
export class CadastroClinicaComponent implements OnInit {

  cadastroForm: FormGroup;

  clinica: Clinica;

  constructor(
    private fb: FormBuilder,
    private service: ClinicaService
  ) { }

  ngOnInit() {
    
    this.clinica = new Clinica();

    this.cadastroForm = this.fb.group({
      nome: [ 
        this.clinica.nome, 
      [
        Validators.required,
        Validators.minLength(4)
      ]],
      endereco: [
        this.clinica.endereco,
      [
        Validators.required,
        Validators.minLength(10)
      ]]
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
    console.log(this.clinica);
    this.service.insert(this.clinica).then((data) =>{
      console.log(data);
      setTimeout(() => {
        this.limpar();
      }, 2500);
    });
  }

}
