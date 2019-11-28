import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddUserToGroupDialogComponent } from './add-user-to-group-dialog.component';
import { UsuarioGrupo } from 'src/app/common/security/usuario.model';
import { Clinica } from 'src/app/pedilandia/clinica/clinica.model';

@Injectable({
  providedIn: 'root'
})
export class AddUserToGroupDialogService {


    constructor(private dialog: MatDialog) { }


    show(group : UsuarioGrupo, parentData : Clinica): MatDialogRef<AddUserToGroupDialogComponent, any> {
        return this.dialog.open(AddUserToGroupDialogComponent, {
            width: '450px',
            data: {group, parentData},
        });
    } 
}
