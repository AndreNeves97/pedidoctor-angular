import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroConsultaTipoComponent } from './cadastro-consulta-tipo/cadastro-consulta-tipo.component';
import { DetalheConsultaTipoComponent } from './detalhe-consulta-tipo/detalhe-consulta-tipo.component';
import { ListagemConsultaTipoComponent } from './listagem-consulta-tipo/listagem-consulta-tipo.component';
import { MainConsultaTipoComponent } from './main-consulta-tipo/main-consulta-tipo.component';
import { UpdateConsultaTipoComponent } from './update-consulta-tipo/update-consulta-tipo.component';


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
        CadastroConsultaTipoComponent,
        DetalheConsultaTipoComponent,
        ListagemConsultaTipoComponent,
        MainConsultaTipoComponent,
        UpdateConsultaTipoComponent
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
        MainConsultaTipoComponent,
        CadastroConsultaTipoComponent,
        ListagemConsultaTipoComponent,
    ],
    entryComponents: [
      DialogComponent
    ]
})
export class ConsultaTipoModule { }
