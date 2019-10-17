import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { ListagemMedicoComponent } from './listagem-medico/listagem-medico.component';

@NgModule({
  declarations: [CadastroMedicoComponent, ListagemMedicoComponent],
  imports: [
    CommonModule
  ],
  exports: [CadastroMedicoComponent, ListagemMedicoComponent]
})
export class MedicoModule { }
