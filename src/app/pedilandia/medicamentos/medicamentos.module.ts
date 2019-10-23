import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { CadastroMedicamentoComponent } from './cadastro-medicamento/cadastro-medicamento.component';
import { MainMedicamentoComponent } from './main-medicamento/main-medicamento.component';
import { DetalheMedicamentoComponent } from './detalhe-medicamento/detalhe-medicamento.component';
import { ListagemMedicamentoComponent } from './listagem-medicamento/listagem-medicamento.component';
import { UpdateMedicamentoComponent } from './update-medicamento/update-medicamento.component';

@NgModule({
  declarations: [CadastroMedicamentoComponent, MainMedicamentoComponent, DetalheMedicamentoComponent, ListagemMedicamentoComponent, UpdateMedicamentoComponent],
  imports: [
    CommonModule,
    MedicamentosRoutingModule
  ]
})
export class MedicamentosModule { }
