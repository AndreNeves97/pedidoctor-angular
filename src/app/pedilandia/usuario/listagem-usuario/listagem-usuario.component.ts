import { UsuarioService } from './../usuario.service';
import { Usuario } from './../../../common/security/usuario.model';
import { Component, OnInit, Inject, ChangeDetectorRef   } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements OnInit {

  private usuarios_listagem: Usuario[];
  private usuario_edit: Usuario;
  private usuario_visualizing: Usuario;

  private editing: boolean = false;
  private visualizing: boolean = false;
  private message_text: string;
  private message_show: boolean;
  private message_class: string;

  displayedColumns: string[] = ['nome', 'email', 'qtConsultas','options'];

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getData();
    }, 3000);
  }

  private getData () {
    this.usuarioService.getResumoForListing().then((dado: Usuario[])=>{
      this.usuarios_listagem = dado;
    });
  }

  private visualizar ( id: string ) {
    this.usuarioService.getUser( id ).then((dado: Usuario)=>{
      this.usuario_visualizing = dado;
      this.visualizing = true;
      this.editing = false;
    });
  }
  
  private editar ( usuario: Usuario ) {
    this.usuarioService.getUser( usuario._id ).then((dado: Usuario)=>{
      this.usuario_edit = dado;
      this.editing = true;
      this.visualizing = false;
    });
  }

  private limpar () {
    this.usuario_edit.nome = "";
    this.usuario_edit.email = "";
  }

  private salvar () {
    this.usuarioService.updateUsuario(this.usuario_edit).then((dado) => {
      if ( dado ) {
        this.message_text = "Usuário alterado com sucesso";
        this.message_class = "success";
        this.message_show = true;
        setTimeout(()=>{
          this.message_show = false;
          this.editing = false;
          this.getData();
        }, 1500);
      } 
    });
  }

  private delete (  ) {
    
  }
 
  private excluir( usuario: Usuario ) {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result ) {
        this.usuarioService.delete( usuario._id ).then((dado)=>{
            console.log(dado);
            this.getData();
        });
      }
    });
  }

  private openDialog () {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    ) 
  {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
