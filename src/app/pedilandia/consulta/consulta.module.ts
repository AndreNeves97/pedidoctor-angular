import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ListagemConsultaComponent } from './listagem-consulta/listagem-consulta.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MainConsultaComponent } from './main-consulta/main-consulta.component';
import { UpdateConsultaComponent } from './update-consulta/update-consulta.component';
import { DetalheConsultaComponent } from './detalhe-consulta/detalhe-consulta.component';

@NgModule({
  declarations: [
    CadastroConsultaComponent,
    ListagemConsultaComponent,
    MainConsultaComponent,
    UpdateConsultaComponent,
    DetalheConsultaComponent
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatTableModule,
    MatStepperModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
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
