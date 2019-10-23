import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroSintomaComponent } from './cadastro-sintoma/cadastro-sintoma.component';
import { DetalheSintomaComponent } from './detalhe-sintoma/detalhe-sintoma.component';
import { ListagemSintomaComponent } from './listagem-sintoma/listagem-sintoma.component';
import { UpdateSintomaComponent } from './update-sintoma/update-sintoma.component';
import { MainSintomaComponent } from './main-sintoma/main-sintoma.component';
import { MatInputModule, MatButtonModule, MatCardModule, MatTabsModule, MatIconModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogComponent } from 'src/app/common/utils/dialog/dialog.component';

@NgModule({
  declarations: [
    CadastroSintomaComponent, 
    DetalheSintomaComponent, 
    ListagemSintomaComponent, 
    UpdateSintomaComponent, 
    MainSintomaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    RouterModule
  ],
  exports: [
    ListagemSintomaComponent,
    CadastroSintomaComponent,
    DetalheSintomaComponent,
    UpdateSintomaComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SintomasModule { }
