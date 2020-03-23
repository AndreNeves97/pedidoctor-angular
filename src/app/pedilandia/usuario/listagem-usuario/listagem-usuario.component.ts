import { UsuarioService } from './../usuario.service';
import { Usuario, UsuarioGrupo, GrupoUsuarioTipo, UsuarioLogadoModel, LoginUsuarioStatus } from './../../../common/security/usuario.model';
import { Component, OnInit, Inject, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AddUserToGroupDialogService } from 'src/app/common/utils/components/add-user-to-group-dialog/add-user-to-group-dialog.service';
import { Clinica } from '../../clinica/clinica.model';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
    selector: 'app-listagem-usuario',
    templateUrl: './listagem-usuario.component.html',
    styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements OnInit, OnChanges {

    private usuarios_listagem: Usuario[];
    private usuario_edit: Usuario;
    private usuario_visualizing: Usuario;

    private editing: boolean = false;
    private visualizing: boolean = false;
    private message_text: string;
    private message_show: boolean;
    private message_class: string;

    @Input()
    group  : UsuarioGrupo;

    @Input()
    dataDefault : Usuario[];

    @Input()
    parentData: Clinica;

    @Output()
    updated : EventEmitter<string> = new EventEmitter();

    @Input()
    addButton = true;

    displayedColumns: string[] = ['nome', 'email', 'options'];

    constructor(
        private usuarioService: UsuarioService,
        public dialog: MatDialog,
        private router : Router,
        private addUserToGroupDialog : AddUserToGroupDialogService,
        private authService : AuthService,
    ) { }

    ngOnInit() {
        
        this.usuarios_listagem = this.dataDefault;

        this.getData();

        this.authService.usuarioLogado.subscribe(v => {
            if(v.status === LoginUsuarioStatus.LOGADO && v.usuario.roles.includes('admin')) {
                this.displayedColumns =  ['nome', 'email', 'admin-options']
            } else {
                this.displayedColumns =  ['nome', 'email', 'options'];
            }
        })
    }

    ngOnChanges() {
        this.usuarios_listagem = this.dataDefault;
        this.getData();

    }

    private getData() {
        if(this.dataDefault == null) {

            this.usuarios_listagem = null;
        
            this.usuarioService.getResumoForListing(this.group).then((dado: Usuario[]) => {
                this.usuarios_listagem = dado;
            });

        }
    }

    async add() {
        
        const dialogRef = this.addUserToGroupDialog.show(this.group, this.parentData);
        await dialogRef.afterClosed().toPromise();

        if(this.dataDefault == null)
            this.getData();
        else
            this.updated.emit(this.parentData._id);

    }

    get deleteMsg() {
        if(this.group.tipo == GrupoUsuarioTipo.ADMIN) {

            return 'Excluir usuário dos administradores';

        } else if(this.group.tipo == GrupoUsuarioTipo.MEDICO) {
            
            return 'Excluir usuário da lista de médicos'; 

        } else {

            return 'Excluir usuário';

        }
    }

    private visualizar(id: string) {
        this.router.navigate(['/pedilandia/usuarios', id])
        // this.usuarioService.getUser(id).then((dado: Usuario) => {
        //     this.usuario_visualizing = dado;
        //     this.visualizing = true;
        //     this.editing = false;
        // });
    }

    private editar(usuario: Usuario) {
        this.router.navigate(['/pedilandia/usuarios/editar/', usuario._id])
        // this.usuarioService.getUser(usuario._id).then((dado: Usuario) => {
        //     this.usuario_edit = dado;
        //     this.editing = true;
        //     this.visualizing = false;
        // });
    }

    private limpar() {
        this.usuario_edit.nome = "";
        this.usuario_edit.email = "";
    }

    private salvar() {
        this.usuarioService.updateUsuario(this.usuario_edit).then((dado) => {
            if (dado) {
                this.message_text = "Usuário alterado com sucesso";
                this.message_class = "success";
                this.message_show = true;
                setTimeout(() => {
                    this.message_show = false;
                    this.editing = false;
                    this.getData();
                }, 1500);
            }
        });
    }

    private delete() {

    }

    private excluir(usuario: Usuario) {
        const dialogRef = this.dialog.open(DialogContent);

        dialogRef.afterClosed().subscribe(result => {
            
            if (result) {

                if(this.group.tipo == GrupoUsuarioTipo.ADMIN) {
                    this.usuarioService.removeAdmin(usuario._id).then((dado) => {
                        this.getData();
                    });
                } else if(this.group.tipo == GrupoUsuarioTipo.MEDICO) {

                    this.usuarioService.removeMedico(usuario._id, this.parentData._id).then((dado) => {
                        
                        if(this.dataDefault == null)
                            this.getData();
                        else
                            this.updated.emit(this.parentData._id);
                    });

                } else {
                    this.usuarioService.delete(usuario._id).then((dado) => {
                        this.getData();
                    });
                }
                
            }
        });
    }

    private openDialog() {
        const dialogRef = this.dialog.open(DialogContent);

    }
}

@Component({
    selector: 'dialog-content',
    templateUrl: './dialog.html',
})
export class DialogContent {
    constructor(
        public dialogRef: MatDialogRef<DialogContent>,
        @Inject(MAT_DIALOG_DATA) public message: string
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
