import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CadastroUsuarioComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
  ], exports: [
    CadastroUsuarioComponent
  ]
})
export class UsuarioModule { }
