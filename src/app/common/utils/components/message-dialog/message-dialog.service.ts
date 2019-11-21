import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageDialogComponent } from './message-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class MessageDialogService {

    constructor(
        private dialog: MatDialog
    ) { }


    openDialog(title: string, msg: string): MatDialogRef<MessageDialogComponent, any> {
        return this.dialog.open(MessageDialogComponent, {
            data: {
                title: title,
                msg: msg
            }
        });
    }
}
