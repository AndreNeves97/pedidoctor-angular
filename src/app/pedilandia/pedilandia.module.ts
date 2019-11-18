import { ConsultaModule } from './consulta/consulta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPedilandiaComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClinicaModule } from './clinica/clinica.module';
import { EnfermeiroModule } from './enfermeiro/enfermeiro.module';
import { MedicoModule } from './medico/medico.module';
import { ConsultaTipoModule } from './consulta-tipo/consulta-tipo.module';
import { DiagnosticoTipoModule } from './diagnostico-tipo/diagnostico-tipo.module';
import { ExameTipoModule } from './exame-tipo/exame-tipo.module';
import { MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { ReportagemConsultaModule } from './reportagem-consulta/reportagem-consulta.module';

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
        ReportagemConsultaModule,
        ConsultaTipoModule,
        DiagnosticoTipoModule,
        ExameTipoModule,

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

        MatProgressSpinnerModule
    ], exports: [
    ], entryComponents: [
    ]
})
export class PedilandiaModule { }
