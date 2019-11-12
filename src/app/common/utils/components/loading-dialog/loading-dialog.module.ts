import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDialogComponent } from './loading-dialog.component';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    declarations: [LoadingDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})
export class LoadingDialogModule { }
