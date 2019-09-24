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



@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        MainPedilandiaComponent,
        DashboardComponent,

        AppComponent,
        DialogUserInfoComponent,
        ToolbarUserAvatarComponent
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

        BrowserAnimationsModule,

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
        DialogUserInfoComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
