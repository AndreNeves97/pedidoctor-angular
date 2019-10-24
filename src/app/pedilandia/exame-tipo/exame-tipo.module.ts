import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroExameTipoComponent } from './cadastro-exame-tipo/cadastro-exame-tipo.component';
import { DetalheExameTipoComponent } from './detalhe-exame-tipo/detalhe-exame-tipo.component';
import { ListagemExameTipoComponent } from './listagem-exame-tipo/listagem-exame-tipo.component';
import { MainExameTipoComponent } from './main-exame-tipo/main-exame-tipo.component';
import { UpdateExameTipoComponent } from './update-exame-tipo/update-exame-tipo.component';


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
        CadastroExameTipoComponent, 
        DetalheExameTipoComponent, 
        ListagemExameTipoComponent, 
        MainExameTipoComponent, 
        UpdateExameTipoComponent
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
        CadastroExameTipoComponent,  
        ListagemExameTipoComponent, 
        MainExameTipoComponent
    ],
    entryComponents: [
        DialogComponent
    ]
})
export class ExameTipoModule { }
