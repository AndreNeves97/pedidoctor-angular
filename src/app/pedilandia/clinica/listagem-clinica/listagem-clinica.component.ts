import { Component, OnInit, Inject } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';

@Component({
  selector: 'app-listagem-clinica',
  templateUrl: './listagem-clinica.component.html',
  styleUrls: ['./listagem-clinica.component.scss']
})
export class ListagemClinicaComponent implements OnInit {

  private clinicas: Clinica[];

  private displayedColumns: string[] = ['nome', 'endereco', 'options'];

  constructor(
    private service:        ClinicaService,
    private router:         Router,
    private dialog_service:  DialogService
  ) { }

  ngOnInit() {
    this.clinicas = [];
    setTimeout(()=>{
      this.getData();
    }, 1000);
  }

  private getData () {
    this.service.findAll().then((dado: Clinica[])=>{
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

    this.dialog_service
      .open_confirmation_dialog(`Tem certeza que deseja excluir a clínica ${clinica.nome}?`)
      .subscribe(resposta => {
        if (resposta) {
          this.service.deleteClinica( clinica._id ).then((dado)=>{
            this.getData();
          });
        }  
      })

  }

}