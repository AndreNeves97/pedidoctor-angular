import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { ConsultaTipo } from '../consulta-tipo.model';
import { ConsultaTipoService } from '../consulta-tipo.service';


@Component({
  selector: 'app-cadastro-consulta-tipo',
  templateUrl: './cadastro-consulta-tipo.component.html',
  styleUrls: ['./cadastro-consulta-tipo.component.scss']
})
export class CadastroConsultaTipoComponent implements OnInit {

    private cadastro_form: FormGroup;

    private obj: ConsultaTipo;
  
    constructor(
      private form_builder:      FormBuilder,
      private service:           ConsultaTipoService,
      private snack_bar_service: SnackService,
      private router:            Router
    ) { }
  
    ngOnInit() {
      
      this.obj = new ConsultaTipo();
  
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
      this.obj = new ConsultaTipo(form_value.nome, form_value.descricao);
      this.service.insert(this.obj).then((data) =>{
        this.snack_bar_service.open_snack_bar( 'Tipo de consulta cadastrado!', 'success' );
        this.limpar();
        this.navigate_back();
      }).catch(error => {
        this.snack_bar_service.open_snack_bar( 'Tipo não cadastrado. Algum erro ocorreu', 'danger' );
      });
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-consulta']);
    }
  

}
