import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { MainModule } from './main/main.module';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,


        BrowserAnimationsModule,

        MainModule,
        


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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
