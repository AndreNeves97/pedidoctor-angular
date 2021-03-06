import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarReportagemComponent } from './realizar-reportagem/realizar-reportagem.component';
import { DetalhesAgendamentoComponent } from './realizar-reportagem/detalhes-agendamento/detalhes-agendamento.component';
import { DiagnosticoConsultaComponent } from './realizar-reportagem/diagnostico-consulta/diagnostico-consulta.component';
import { ReceitaConsultaComponent } from './realizar-reportagem/receita-consulta/receita-consulta.component';
import { ConfirmacaoConsultaComponent } from './realizar-reportagem/confirmacao-consulta/confirmacao-consulta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatIconModule, MatExpansionModule, MatButtonModule, MatProgressSpinnerModule, MatInputModule, MatChipsModule, MatCardModule, MatAutocompleteModule, MatSelectModule } from '@angular/material';
import { AppDateModule } from 'src/app/common/pipes/app-date/app-date.module';

@NgModule({
  declarations: [
    RealizarReportagemComponent,
    DetalhesAgendamentoComponent,
    DiagnosticoConsultaComponent,
    ReceitaConsultaComponent,
    ConfirmacaoConsultaComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    AppDateModule
  ],
  exports: [
    RealizarReportagemComponent
  ]
})
export class ReportagemConsultaModule { }
