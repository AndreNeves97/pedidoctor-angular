import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTreeModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [HomeComponent, MainComponent],
    exports: [HomeComponent]
})
export class MainModule { }
