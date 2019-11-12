import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoadingDialogComponent } from './loading-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class LoadingDialogService {

    constructor(private dialog: MatDialog) { }


    show(): MatDialogRef<LoadingDialogComponent, any> {
        return this.dialog.open(LoadingDialogComponent, {
            width: '450px',
            height: '200px',
            data: {}
        });
    } 
}
