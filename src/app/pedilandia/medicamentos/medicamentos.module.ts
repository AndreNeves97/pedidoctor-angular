import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroMedicamentoComponent } from './cadastro-medicamento/cadastro-medicamento.component';
import { MainMedicamentoComponent } from './main-medicamento/main-medicamento.component';
import { DetalheMedicamentoComponent } from './detalhe-medicamento/detalhe-medicamento.component';
import { ListagemMedicamentoComponent } from './listagem-medicamento/listagem-medicamento.component';
import { UpdateMedicamentoComponent } from './update-medicamento/update-medicamento.component';
import { DialogComponent } from 'src/app/common/utils/dialog/dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule, MatTabsModule, MatSelectModule, MatIconModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CadastroMedicamentoComponent, 
    MainMedicamentoComponent, 
    DetalheMedicamentoComponent, 
    ListagemMedicamentoComponent, 
    UpdateMedicamentoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    RouterModule
  ],
  exports: [
    CadastroMedicamentoComponent, 
    MainMedicamentoComponent, 
    DetalheMedicamentoComponent, 
    ListagemMedicamentoComponent, 
    UpdateMedicamentoComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class MedicamentosModule { }
