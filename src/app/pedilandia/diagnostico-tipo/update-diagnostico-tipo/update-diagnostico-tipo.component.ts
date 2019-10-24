import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DiagnosticoTipo } from '../diagnostico-tipo.model';
import { DiagnosticoTipoService } from '../diagnostico-tipo.service';

@Component({
  selector: 'app-update-diagnostico-tipo',
  templateUrl: './update-diagnostico-tipo.component.html',
  styleUrls: ['./update-diagnostico-tipo.component.scss']
})
export class UpdateDiagnosticoTipoComponent implements OnInit {

    private update_form: FormGroup;

    private obj: DiagnosticoTipo;
  
    constructor(
      private form_builder:       FormBuilder,
      private service:            DiagnosticoTipoService,
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
          this.service.find(id).then((obj: DiagnosticoTipo) => {
            this.obj = obj;
            if ( !obj ) this.navigate_back();
            else this.set_values();
          })
        });
  
    }
  
    ngOnInit() {
      
      this.obj = new DiagnosticoTipo();
  
      this.update_form = this.form_builder.group({
        _id: this.obj._id, 
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
  
    set_values () {
      this.update_form.patchValue({
        _id : this.obj._id ? this.obj._id : "",
        nome : this.obj.nome ? this.obj.nome : "",
        descricao: this.obj.descricao ? this.obj.descricao : ""
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
  
      this.obj = new DiagnosticoTipo(
            form_value.nome, 
            form_value.descricao,
            form_value._id);
      
      this.service.update(this.obj).then((data) =>{
        
        if ( data ) {
          this.snack_bar_service
              .open_snack_bar( 'Tipo de diagnostico atualizado!', 'success' );
          this.limpar();
          this.navigate_back();
        } else {
          throw "Erro ao atualizar"
        }
      
      }).catch(error => {
        this.snack_bar_service
            .open_snack_bar( 'Tipo de diagnostico não atualizado. Algum erro ocorreu', 'danger' );
      });
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-diagnostico']);
    }
  


}
