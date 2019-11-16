import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarReportagemComponent } from './realizar-reportagem/realizar-reportagem.component';
import { DetalhesConsultaComponent } from './realizar-reportagem/detalhes-consulta/detalhes-consulta.component';
import { DiagnosticoConsultaComponent } from './realizar-reportagem/diagnostico-consulta/diagnostico-consulta.component';
import { ReceitaConsultaComponent } from './realizar-reportagem/receita-consulta/receita-consulta.component';
import { ConfirmacaoConsultaComponent } from './realizar-reportagem/confirmacao-consulta/confirmacao-consulta.component';

@NgModule({
  declarations: [
    RealizarReportagemComponent,
    DetalhesConsultaComponent,
    DiagnosticoConsultaComponent,
    ReceitaConsultaComponent,
    ConfirmacaoConsultaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportagemConsultaModule { }
