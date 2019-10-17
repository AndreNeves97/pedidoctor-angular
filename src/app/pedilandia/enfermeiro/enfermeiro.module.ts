import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroEnfermeiroComponent } from './cadastro-enfermeiro/cadastro-enfermeiro.component';
import { ListagemEnfermeiroComponent } from './listagem-enfermeiro/listagem-enfermeiro.component';

@NgModule({
  declarations: [CadastroEnfermeiroComponent, ListagemEnfermeiroComponent],
  imports: [
    CommonModule
  ],
  exports: [CadastroEnfermeiroComponent, ListagemEnfermeiroComponent]
})
export class EnfermeiroModule { }
