import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserToGroupDialogComponent } from './add-user-to-group-dialog.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AddUserToGroupDialogComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    entryComponents: [
        AddUserToGroupDialogComponent
    ]
})
export class AddUserToGroupDialogModule { }
