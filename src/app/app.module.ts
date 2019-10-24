import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UsuarioModule } from './pedilandia/usuario/usuario.module';
import { ConsultaModule } from './pedilandia/consulta/consulta.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { MainModule } from './main/main.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MainPedilandiaComponent } from './pedilandia/main.component';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';


import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent as PedilandiaDashBoardComponent, DashboardComponent } from './pedilandia/dashboard/dashboard.component';
import { MainSupperComponent } from './supper/main.component';
import { DialogUserInfoComponent } from './common/utils/components/dialog-user-info/dialog-user-info.component';
import { ToolbarUserAvatarComponent } from './common/utils/components/toolbar-user-avatar/toolbar-user-avatar.component';

import { PedilandiaModule } from './pedilandia/pedilandia.module';
import { SupperModule } from './supper/supper.module';
import { FeastModule } from './feast/feast.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ClinicaModule } from './pedilandia/clinica/clinica.module';
import { EnfermeiroModule } from './pedilandia/enfermeiro/enfermeiro.module';
import { MedicoModule } from './pedilandia/medico/medico.module';
import { SnackComponent } from './common/utils/snack/snack.component';
import { DialogComponent } from './common/utils/dialog/dialog.component';
import { SintomasModule } from './pedilandia/sintomas/sintomas.module';
import { MedicamentosModule } from './pedilandia/medicamentos/medicamentos.module';
import { DoencasModule } from './pedilandia/doencas/doencas.module';
import { ConsultaTipoModule } from './pedilandia/consulta-tipo/consulta-tipo.module';
import { DiagnosticoTipoModule } from './pedilandia/diagnostico-tipo/diagnostico-tipo.module';
import { ExameTipoModule } from './pedilandia/exame-tipo/exame-tipo.module';


@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        MainPedilandiaComponent,
        DashboardComponent,
        MainSupperComponent,

        AppComponent,
        DialogUserInfoComponent,
        ToolbarUserAvatarComponent,
        SnackComponent,
        SnackComponent,
        DialogComponent,
    ],
    imports: [
        // PedilandiaModule,
        // SupperModule,
        // MainModule,
        // FeastModule,

        BrowserModule,
        AppRoutingModule,

        UsuarioModule,
        ConsultaModule,
        ClinicaModule,
        EnfermeiroModule,
        MedicoModule,
        SintomasModule,
        MedicamentosModule,
        DoencasModule,
        ConsultaTipoModule,
        DiagnosticoTipoModule,
        ExameTipoModule,

        BrowserAnimationsModule,
        MatAutocompleteModule,

        // MainModule,
        
        MatInputModule,

        HttpClientModule,


        LayoutModule,


        AngularFireModule.initializeApp(environment.firebase),
        
        AngularFireDatabaseModule,
        AngularFireAuthModule,

        MatToolbarModule,


        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTreeModule,
        MatTooltipModule,
        MatGridListModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        LayoutModule,
    ],
    exports : [
    ],
    entryComponents: [
        SnackComponent,
        DialogUserInfoComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
