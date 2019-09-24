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
import { ToolbarUserAvatarComponent } from '../common/utils/components/toolbar-user-avatar/toolbar-user-avatar.component';
import { DialogUserInfoComponent } from '../common/utils/components/dialog-user-info/dialog-user-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [
        HomeComponent, 
        MainComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
  

        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        LayoutModule,
        
        MatSidenavModule,
        MatToolbarModule,
        UsuarioModule,
        ConsultaModule,
        MatTreeModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        
        MatTooltipModule,

    ],
    exports: [HomeComponent]
})
export class MainModule { }
