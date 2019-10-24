import { Component, OnInit } from '@angular/core';
import { DiagnosticoTipo } from '../diagnostico-tipo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Router } from '@angular/router';
import { DiagnosticoTipoService } from '../diagnostico-tipo.service';

@Component({
  selector: 'app-cadastro-diagnostico-tipo',
  templateUrl: './cadastro-diagnostico-tipo.component.html',
  styleUrls: ['./cadastro-diagnostico-tipo.component.scss']
})
export class CadastroDiagnosticoTipoComponent implements OnInit {


    private cadastro_form: FormGroup;

    private obj: DiagnosticoTipo;
  
    constructor(
      private form_builder:      FormBuilder,
      private service:           DiagnosticoTipoService,
      private snack_bar_service: SnackService,
      private router:            Router
    ) { }
  
    ngOnInit() {
      
      this.obj = new DiagnosticoTipo();
  
      this.cadastro_form = this.form_builder.group({
        nome: [ 
          this.obj.nome, 
          [
            Validators.required,
            Validators.minLength(4)
          ]
        ],
        descricao: [
          this.obj.descricao,
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
  
    get descricao () {
      return this.cadastro_form.get('descricao');
    }
  
    limpar () {
      this.cadastro_form.reset();
    }
  
    cadastrar () {
      const form_value = this.cadastro_form.value;
      this.obj = new DiagnosticoTipo(form_value.nome, form_value.descricao);
      this.service.insert(this.obj).then((data) =>{
        this.snack_bar_service.open_snack_bar( 'Tipo de diagnostico cadastrado!', 'success' );
        this.limpar();
        this.navigate_back();
      }).catch(error => {
        this.snack_bar_service.open_snack_bar( 'Tipo não cadastrado. Algum erro ocorreu', 'danger' );
      });
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-diagnostico']);
    }
  


}
