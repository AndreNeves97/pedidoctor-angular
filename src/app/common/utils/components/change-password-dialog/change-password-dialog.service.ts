import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordDialogService {

    constructor(private dialog: MatDialog) { }


    show(): MatDialogRef<ChangePasswordDialogComponent, any> {
        return this.dialog.open(ChangePasswordDialogComponent, {
            width: '450px',
            data: {}
        });
    }
}
