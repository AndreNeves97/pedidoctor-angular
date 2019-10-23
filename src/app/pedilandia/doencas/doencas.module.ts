import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoencasRoutingModule } from './doencas-routing.module';
import { CadastroDoencaComponent } from './cadastro-doenca/cadastro-doenca.component';
import { DetalheDoencaComponent } from './detalhe-doenca/detalhe-doenca.component';
import { ListagemDoencaComponent } from './listagem-doenca/listagem-doenca.component';
import { UpdateDoencaComponent } from './update-doenca/update-doenca.component';
import { MainDoencaComponent } from './main-doenca/main-doenca.component';

@NgModule({
  declarations: [CadastroDoencaComponent, DetalheDoencaComponent, ListagemDoencaComponent, UpdateDoencaComponent, MainDoencaComponent],
  imports: [
    CommonModule,
    DoencasRoutingModule
  ]
})
export class DoencasModule { }
