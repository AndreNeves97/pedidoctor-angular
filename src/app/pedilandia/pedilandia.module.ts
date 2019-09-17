import { ConsultaModule } from './consulta/consulta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedilandiaRoutingModule } from './pedilandia-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PedilandiaRoutingModule
  ], exports: [
    UsuarioModule,
    ConsultaModule
  ]
})
export class PedilandiaModule { }
