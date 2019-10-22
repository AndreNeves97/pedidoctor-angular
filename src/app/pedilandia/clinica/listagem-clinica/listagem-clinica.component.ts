import { Component, OnInit, Inject } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { Router } from '@angular/router';

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
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.clinicas = [];
    this.clinica_edit = new Clinica();
    this.clinica_visualizing = new Clinica();
    setTimeout(()=>{
      this.getData();
    }, 1000);

  }

  private getData () {
    this.clinicaService.findAll().then((dado: Clinica[])=>{
      this.clinicas = dado;
    });
  }

  private visualizar ( id: string ) {
    this.router.navigate(['/pedilandia/clinica/', id ])
  }

  private editar ( id: string ) {
    this.router.navigate(['/pedilandia/clinica/editar/', id ])
  }

  private excluir ( clinica: Clinica ) {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result ) {
        this.clinicaService.deleteClinica( clinica._id ).then((dado)=>{
            this.getData();
        });
      }
    });
  }

  private openDialog () {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => { });
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