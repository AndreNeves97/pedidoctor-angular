import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    CadastroConsultaComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    TextMaskModule
  ],
  exports: [
    CadastroConsultaComponent
  ]
})
export class ConsultaModule { }
