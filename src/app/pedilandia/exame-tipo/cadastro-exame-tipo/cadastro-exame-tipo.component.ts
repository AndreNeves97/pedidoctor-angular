import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Router } from '@angular/router';
import { ExameTipo } from '../exame-tipo.model';
import { ExameTipoService } from '../exame-tipo.service';

@Component({
  selector: 'app-cadastro-exame-tipo',
  templateUrl: './cadastro-exame-tipo.component.html',
  styleUrls: ['./cadastro-exame-tipo.component.scss']
})
export class CadastroExameTipoComponent implements OnInit {


    private cadastro_form: FormGroup;

    private obj: ExameTipo;
  
    constructor(
      private form_builder:      FormBuilder,
      private service:           ExameTipoService,
      private snack_bar_service: SnackService,
      private router:            Router
    ) { }
  
    ngOnInit() {
      
      this.obj = new ExameTipo();
  
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
      this.obj = new ExameTipo(form_value.nome, form_value.descricao);
      this.service.insert(this.obj).then((data) =>{
        this.snack_bar_service.open_snack_bar( 'Tipo de exame cadastrado!', 'success' );
        this.limpar();
        this.navigate_back();
      }).catch(error => {
        this.snack_bar_service.open_snack_bar( 'Tipo não cadastrado. Algum erro ocorreu', 'danger' );
      });
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-exame']);
    }
  


}
