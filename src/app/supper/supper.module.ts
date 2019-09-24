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

@NgModule({
    declarations: [MainSupperComponent],
    imports: [
        CommonModule,
        SupperRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ],
    exports: [
        MainSupperComponent
    ]
})
export class SupperModule {
    constructor(overlayContainer: OverlayContainer) {
        overlayContainer.getContainerElement().classList.add('candy-theme');
    }
}
