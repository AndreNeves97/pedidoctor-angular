import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ChangePasswordDialogComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
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
