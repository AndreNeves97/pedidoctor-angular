import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { UsuarioModule } from '../pedilandia/usuario/usuario.module';
import { ConsultaModule } from '../pedilandia/consulta/consulta.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        UsuarioModule,
        ConsultaModule,
        MatTreeModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        
        MatTooltipModule,

    ],
    declarations: [HomeComponent, MainComponent],
    exports: [HomeComponent]
})
export class MainModule { }
