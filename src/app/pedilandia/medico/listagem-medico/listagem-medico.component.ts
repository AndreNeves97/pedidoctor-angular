import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Medico } from '../medico.model';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-listagem-medico',
  templateUrl: './listagem-medico.component.html',
  styleUrls: ['./listagem-medico.component.scss']
})
export class ListagemMedicoComponent implements OnInit {


  private medicos_listagem: Medico[];
  private medico_edit: Medico;
  private medico_visualizing: Medico;

  private editing: boolean = false;
  private visualizing: boolean = false;
  private message_text: string;
  private message_show: boolean;
  private message_class: string;

  displayedColumns: string[] = ['nome', 'email', 'telefone', 'options'];

  constructor(
    private medicoService: MedicoService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.medicos_listagem = [];
    setTimeout(()=>{
      this.getData();
    }, 3000);
  }

  private getData () {
    this.medicoService.getResumoForListing().then((dado: Medico[])=>{
      this.medicos_listagem = dado;
    });
  }

  private visualizar ( id: string ) {
    this.medicoService.find( id ).then((dado: Medico)=>{
      this.medico_visualizing = dado;
      this.visualizing = true;
      this.editing = false;
    });
  }
  
  private editar ( medico: Medico ) {
    this.medicoService.find( medico._id ).then((dado: Medico)=>{
      this.medico_edit = dado;
      this.editing = true;
      this.visualizing = false;
    });
  }

  private limpar () {
    this.medico_edit.nome = "";
    this.medico_edit.email = "";
  }

  private salvar () {
    this.medicoService.updateEnfermeiro(this.medico_edit).then((dado) => {
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
 
  private excluir( medico: Medico ) {
    this.medicoService.deleteEnfermeiro( medico._id ).then((dado)=>{
        this.getData();
    });
  }

  private openDialog () {
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
    ) 
  {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}