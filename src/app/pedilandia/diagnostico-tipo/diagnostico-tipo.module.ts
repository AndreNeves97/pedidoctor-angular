import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroDiagnosticoTipoComponent } from './cadastro-diagnostico-tipo/cadastro-diagnostico-tipo.component';
import { DetalheDiagnosticoTipoComponent } from './detalhe-diagnostico-tipo/detalhe-diagnostico-tipo.component';
import { ListagemDiagnosticoTipoComponent } from './listagem-diagnostico-tipo/listagem-diagnostico-tipo.component';
import { MainDiagnosticoTipoComponent } from './main-diagnostico-tipo/main-diagnostico-tipo.component';
import { UpdateDiagnosticoTipoComponent } from './update-diagnostico-tipo/update-diagnostico-tipo.component';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MAT_DATE_LOCALE,
    MatDialogModule,
    MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DialogComponent } from 'src/app/common/utils/dialog/dialog.component';

@NgModule({
    declarations: [
        CadastroDiagnosticoTipoComponent,
        DetalheDiagnosticoTipoComponent,
        ListagemDiagnosticoTipoComponent,
        MainDiagnosticoTipoComponent,
        UpdateDiagnosticoTipoComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatTableModule,
        MatTooltipModule,
        MatTabsModule,
        MatIconModule,
        MatSelectModule,
        RouterModule
    ],
    exports: [
        CadastroDiagnosticoTipoComponent,
        ListagemDiagnosticoTipoComponent,
        MainDiagnosticoTipoComponent,
    ],
    entryComponents: [
        DialogComponent
    ]
})
export class DiagnosticoTipoModule { }
