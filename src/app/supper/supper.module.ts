import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupperRoutingModule } from './supper-routing.module';
import { MainSupperComponent } from './main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,

        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,

        MatButtonModule,
        LayoutModule,


        MatInputModule,

        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTreeModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,

        
        MatTooltipModule,



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
    ],
    exports: [
        
    ]
})
export class SupperModule {
    constructor(overlayContainer: OverlayContainer) {
        console.log('supper module');
        overlayContainer.getContainerElement().classList.add('candy-theme');
    }
}
