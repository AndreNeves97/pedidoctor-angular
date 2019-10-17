import { Component, OnInit, Inject } from '@angular/core';
import { Enfermeiro } from '../enfermeiro.model';
import { EnfermeiroService } from '../enfermeiro.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-listagem-enfermeiro',
  templateUrl: './listagem-enfermeiro.component.html',
  styleUrls: ['./listagem-enfermeiro.component.scss']
})
export class ListagemEnfermeiroComponent implements OnInit {

  private enfermeiros_listagem: Enfermeiro[];
  private enfermeiro_edit: Enfermeiro;
  private enfermeiro_visualizing: Enfermeiro;

  private editing: boolean = false;
  private visualizing: boolean = false;
  private message_text: string;
  private message_show: boolean;
  private message_class: string;

  displayedColumns: string[] = ['nome', 'email', 'telefone', 'options'];

  constructor(
    private enfermeiroService: EnfermeiroService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.enfermeiros_listagem = [];
    setTimeout(()=>{
      this.getData();
    }, 3000);
  }

  private getData () {
    this.enfermeiroService.getResumoForListing().then((dado: Enfermeiro[])=>{
      this.enfermeiros_listagem = dado;
    });
  }

  private visualizar ( id: string ) {
    console.log(id);
    this.enfermeiroService.find( id ).then((dado: Enfermeiro)=>{
      this.enfermeiro_visualizing = dado;
      this.visualizing = true;
      this.editing = false;
    });
  }
  
  private editar ( enfermeiro: Enfermeiro ) {
    this.enfermeiroService.find( enfermeiro._id ).then((dado: Enfermeiro)=>{
      this.enfermeiro_edit = dado;
      this.editing = true;
      this.visualizing = false;
    });
  }

  private limpar () {
    this.enfermeiro_edit.nome = "";
    this.enfermeiro_edit.email = "";
  }

  private salvar () {
    this.enfermeiroService.updateEnfermeiro(this.enfermeiro_edit).then((dado) => {
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
 
  private excluir( enfermeiro: Enfermeiro ) {
    // const dialogRef = this.dialog.open(DialogContent);

    // dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      // if (result ) {
        this.enfermeiroService.deleteEnfermeiro( enfermeiro._id ).then((dado)=>{
            console.log(dado);
            this.getData();
        });
      // }
    // });
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
