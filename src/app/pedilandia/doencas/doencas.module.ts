import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroDoencaComponent } from './cadastro-doenca/cadastro-doenca.component';
import { DetalheDoencaComponent } from './detalhe-doenca/detalhe-doenca.component';
import { ListagemDoencaComponent } from './listagem-doenca/listagem-doenca.component';
import { UpdateDoencaComponent } from './update-doenca/update-doenca.component';
import { MainDoencaComponent } from './main-doenca/main-doenca.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule, MatTabsModule, MatIconModule, MatSnackBarModule, MatTableModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DialogComponent } from 'src/app/common/utils/dialog/dialog.component';

@NgModule({
  declarations: [
    CadastroDoencaComponent, 
    DetalheDoencaComponent, 
    ListagemDoencaComponent, 
    UpdateDoencaComponent, 
    MainDoencaComponent
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
  exports : [
    ListagemDoencaComponent,
    CadastroDoencaComponent,
    DetalheDoencaComponent,
    UpdateDoencaComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class DoencasModule { }
