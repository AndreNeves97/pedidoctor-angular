import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';



@NgModule({
    declarations: [MessageDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],

    entryComponents: [
        MessageDialogComponent
    ]
})
export class MessageDialogModule { }
