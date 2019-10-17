import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClinicaComponent, DialogContent } from './listagem-clinica/listagem-clinica.component';
import { CadastroClinicaComponent } from './cadastro-clinica/cadastro-clinica.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatTableModule, MatTabsModule, MatIconModule, MatDividerModule, MatTooltipModule, MAT_DATE_LOCALE, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    ListagemClinicaComponent, 
    CadastroClinicaComponent,
    DialogContent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
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
