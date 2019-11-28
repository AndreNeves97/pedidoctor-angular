import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClinicaComponent } from './listagem-clinica/listagem-clinica.component';
import { CadastroClinicaComponent } from './cadastro-clinica/cadastro-clinica.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatInputModule, 
          MatButtonModule, 
          MatSelectModule, 
          MatTableModule, 
          MatTabsModule, 
          MatIconModule,
          MatDividerModule, 
          MatCardModule,
          MatTooltipModule, 
          MAT_DATE_LOCALE, 
          MatDialogModule, 
          MatProgressSpinnerModule} from '@angular/material';
import { DetalheClinicaComponent } from './detalhe-clinica/detalhe-clinica.component';
import { UpdateClinicaComponent } from './update-clinica/update-clinica.component';
import { MainClinicaComponent } from './main-clinica/main-clinica.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from 'src/app/common/utils/dialog/dialog.component';
import { UsuarioModule } from '../usuario/usuario.module';

@NgModule({
  declarations: [
    ListagemClinicaComponent, 
    CadastroClinicaComponent,
    DetalheClinicaComponent,
    UpdateClinicaComponent,
    MainClinicaComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule,
    UsuarioModule
  ],
  exports: [
    ListagemClinicaComponent, 
    CadastroClinicaComponent,
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ClinicaModule { }
