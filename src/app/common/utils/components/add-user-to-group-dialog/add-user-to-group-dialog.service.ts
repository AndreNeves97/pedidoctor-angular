import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddUserToGroupDialogComponent } from './add-user-to-group-dialog.component';
import { UsuarioGrupo } from 'src/app/common/security/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AddUserToGroupDialogService {


    constructor(private dialog: MatDialog) { }


    show(group : UsuarioGrupo): MatDialogRef<AddUserToGroupDialogComponent, any> {
        return this.dialog.open(AddUserToGroupDialogComponent, {
            width: '450px',
            data: {group},
        });
    } 
}
