import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';

@NgModule({
  declarations: [
    CadastroConsultaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CadastroConsultaComponent
  ]
})
export class ConsultaModule { }
