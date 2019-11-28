import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioGrupo, Usuario, GrupoUsuarioTipo } from 'src/app/common/security/usuario.model';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap, filter } from 'rxjs/operators';
import { UsuarioService } from 'src/app/pedilandia/usuario/usuario.service';
import { SnackService } from '../../snack/snack.service';
import { Clinica } from 'src/app/pedilandia/clinica/clinica.model';


@Component({
    selector: 'app-add-user-to-group-dialog',
    templateUrl: './add-user-to-group-dialog.component.html',
    styleUrls: ['./add-user-to-group-dialog.component.scss']
})
export class AddUserToGroupDialogComponent implements OnInit {
    title: string;
    loading : boolean;


    inputControl = new FormControl();
    filteredOptions: Subject<Usuario[]>;

    constructor(
        public dialog: MatDialogRef<AddUserToGroupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { group: UsuarioGrupo, parentData : Clinica },
        private usuarioService : UsuarioService,
        private snackService    : SnackService
    ) { }



    ngOnInit() {
        const tipo = this.data.group.tipo;

        if (tipo == GrupoUsuarioTipo.ADMIN) {
            this.title = 'Adicionar administrador'
        } else if(tipo == GrupoUsuarioTipo.MEDICO) {
            this.title = 'Adicionar médico';
        }



        this.filteredOptions = new Subject();

        this.inputControl.valueChanges
            .pipe(
                tap(v => this.filteredOptions.next([])),
                filter(v => typeof v == 'string' && v != ""),
                tap(v => this.loading = true),
                switchMap(value => this._filter(value)),
                tap(v => this.loading = false),
                tap(v => this.filteredOptions.next(v)),
            ).subscribe();
    }


    private async _filter(value: string): Promise<Usuario[]> {
        console.log(value)
        const filterValue = value.toLowerCase();


        return await this.usuarioService.query(filterValue);
    }

    async selected($event) {
        
        this.inputControl.setValue('');
        const usuario : Usuario = $event.option.value;

        if(this.data.group.tipo == GrupoUsuarioTipo.ADMIN) {
            await this.usuarioService.addAdmin(usuario._id);
        } else {
            await this.usuarioService.addMedico(usuario._id, this.data.parentData._id)
        }

        this.snackService.open_snack_bar(`${usuario.nome} adicionado!`)
    
    }

}
