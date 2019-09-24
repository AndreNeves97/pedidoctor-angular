import { ConsultaModule } from './consulta/consulta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedilandiaRoutingModule } from './pedilandia-routing.module';
import { MainPedilandiaComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    declarations: [
        MainPedilandiaComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        PedilandiaRoutingModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
    ], exports: [
        UsuarioModule,
        ConsultaModule,
        MainPedilandiaComponent,
        DashboardComponent
    ]
})
export class PedilandiaModule { }
