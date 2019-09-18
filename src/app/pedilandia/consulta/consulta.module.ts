import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    CadastroConsultaComponent
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonModule,
    TextMaskModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    CadastroConsultaComponent
  ]
})
export class ConsultaModule { }
