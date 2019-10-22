import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClinicaComponent, DialogContent } from './listagem-clinica/listagem-clinica.component';
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
          MatDialogModule } from '@angular/material';
import { DetalheClinicaComponent } from './detalhe-clinica/detalhe-clinica.component';
import { UpdateClinicaComponent } from './update-clinica/update-clinica.component';
import { MainClinicaComponent } from './main-clinica/main-clinica.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListagemClinicaComponent, 
    CadastroClinicaComponent,
    DialogContent,
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
    RouterModule
  ],
  exports: [
    ListagemClinicaComponent, 
    CadastroClinicaComponent
  ],
  entryComponents: [
    DialogContent
  ]
})
export class ClinicaModule { }
