import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { ListagemMedicoComponent, DialogContent } from './listagem-medico/listagem-medico.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatIconModule, MatButtonModule, MatTableModule, MatTabsModule, MatTooltipModule, MatDialogModule, MatDividerModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CadastroMedicoComponent, 
    ListagemMedicoComponent,
    DialogContent
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
    CadastroMedicoComponent, 
    ListagemMedicoComponent
  ]
})
export class MedicoModule { }
