import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [ChangePasswordDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    entryComponents: [
        ChangePasswordDialogComponent
    ]
})
export class ChangePasswordDialogModule { }
