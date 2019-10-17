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
import { ToolbarUserAvatarComponent } from '../common/utils/components/toolbar-user-avatar/toolbar-user-avatar.component';
import { DialogUserInfoComponent } from '../common/utils/components/dialog-user-info/dialog-user-info.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClinicaModule } from './clinica/clinica.module';
import { EnfermeiroModule } from './enfermeiro/enfermeiro.module';
import { MedicoModule } from './medico/medico.module';

@NgModule({
    declarations: [ 
        MainPedilandiaComponent,
        DashboardComponent,
    ],
    imports: [
        UsuarioModule,
        ConsultaModule,
        ClinicaModule,
        EnfermeiroModule,
        MedicoModule,

        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,


        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTreeModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,

        
        MatTooltipModule,
    ], exports: [
    ]
})
export class PedilandiaModule { }
