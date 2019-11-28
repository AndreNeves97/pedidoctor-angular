import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ListagemUsuarioComponent, DialogContent } from './listagem-usuario/listagem-usuario.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';
import { DetalheUsuarioComponent } from './detalhe-usuario/detalhe-usuario.component';

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    ListagemUsuarioComponent,
    DialogContent,
    MainUsuarioComponent,
    DetalheUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TextMaskModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ], exports: [
    CadastroUsuarioComponent,
    ListagemUsuarioComponent
  ], entryComponents: [
    DialogContent
  ]
})
export class UsuarioModule { }
