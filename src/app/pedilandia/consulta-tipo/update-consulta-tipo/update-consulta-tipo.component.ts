import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultaTipo } from '../consulta-tipo.model';
import { ClinicaService } from '../../clinica/clinica.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { ConsultaTipoService } from '../consulta-tipo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-consulta-tipo',
  templateUrl: './update-consulta-tipo.component.html',
  styleUrls: ['./update-consulta-tipo.component.scss']
})
export class UpdateConsultaTipoComponent implements OnInit {

    private update_form: FormGroup;

    private obj: ConsultaTipo;
  
    constructor(
      private form_builder:       FormBuilder,
      private service:            ConsultaTipoService,
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
          this.service.find(id).then((obj: ConsultaTipo) => {
            this.obj = obj;
            if ( !obj ) this.navigate_back();
            else this.set_values();
          })
        });
  
    }
  
    ngOnInit() {
      
      this.obj = new ConsultaTipo();
  
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
  
      this.obj = new ConsultaTipo(
            form_value.nome, 
            form_value.descricao,
            form_value._id);
      
      this.service.update(this.obj).then((data) =>{
        
        if ( data ) {
          this.snack_bar_service
              .open_snack_bar( 'Tipo de consulta atualizado!', 'success' );
          this.limpar();
          this.navigate_back();
        } else {
          throw "Erro ao atualizar"
        }
      
      }).catch(error => {
        this.snack_bar_service
            .open_snack_bar( 'Tipo de consulta não atualizado. Algum erro ocorreu', 'danger' );
      });
    }
  
    navigate_back () {
      this.router.navigate(['/pedilandia/tipos-consulta']);
    }
  

}
