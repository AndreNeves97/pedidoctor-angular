import { Component, OnInit, Inject } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 

@Component({
  selector: 'app-listagem-clinica',
  templateUrl: './listagem-clinica.component.html',
  styleUrls: ['./listagem-clinica.component.scss']
})
export class ListagemClinicaComponent implements OnInit {

  private clinica_edit: Clinica;
  private clinica_visualizing: Clinica;

  private editing: boolean = false;
  private visualizing: boolean = false;
  private message_text: string;
  private message_show: boolean;
  private message_class: string;

  clinicas: Clinica[];

  displayedColumns: string[] = ['nome', 'endereco', 'options'];

  constructor(
    private clinicaService: ClinicaService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clinicas = [];
    this.clinica_edit = new Clinica();
    this.clinica_visualizing = new Clinica();
    setTimeout(()=>{
      this.getData();
    }, 3000);
  }

  private getData () {
    this.clinicaService.findAll().then((dado: Clinica[])=>{
      this.clinicas = dado;
    });
  }

  private visualizar ( id: string ) {
    this.clinicaService.find( id ).then((dado: Clinica)=>{
      this.clinica_visualizing = dado;
      this.visualizing = true;
      this.editing = false;
    });
  }

  private editar ( clinica: Clinica ) {
    this.clinicaService.find( clinica._id ).then((dado: Clinica)=>{
      console.log(dado);
      this.clinica_edit = dado;
      this.editing = true;
      this.visualizing = false;
    });
  }

  private excluir ( clinica: Clinica ) {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result ) {
        this.clinicaService.deleteClinica( clinica._id ).then((dado)=>{
            console.log(dado);
            this.getData();
        });
      }
    });
  }

  private salvar () {
    this.clinicaService.updateClinica(this.clinica_edit).then((dado)=> {
      if(dado) {
        this.message_text = "Clínica alterada com sucesso";
        this.message_class = "success";
        this.message_show = true;
        setTimeout(()=>{
          this.message_show = false;
          this.editing = false;
          this.getData();
        }, 1500);
      }
      console.log(dado)
    })
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