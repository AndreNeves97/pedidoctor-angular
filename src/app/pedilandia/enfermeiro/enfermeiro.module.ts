import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroEnfermeiroComponent } from './cadastro-enfermeiro/cadastro-enfermeiro.component';
import { ListagemEnfermeiroComponent } from './listagem-enfermeiro/listagem-enfermeiro.component';
import { MatInputModule, MatDividerModule, MatDialogModule, MatTooltipModule, MatTabsModule, MatTableModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogContent } from '../usuario/listagem-usuario/listagem-usuario.component';

@NgModule({
  declarations: [
    CadastroEnfermeiroComponent, 
    ListagemEnfermeiroComponent,
    // DialogContent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TextMaskModule
  ],
  exports: [
    CadastroEnfermeiroComponent, 
    ListagemEnfermeiroComponent
  ]
})
export class EnfermeiroModule { }
