import { Consulta } from './../consulta.model';
import { ConsultaService } from './../consulta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';


@Component({
  selector: 'app-listagem-consulta',
  templateUrl: './listagem-consulta.component.html',
  styleUrls: ['./listagem-consulta.component.scss']
})
export class ListagemConsultaComponent implements OnInit {

  private consultas_listagem: Consulta[];

  displayedColumns: string[] = ['data', 'nomePaciente', 'tipoConsulta', 'options'];

  constructor(
    private service         : ConsultaService,
    private router          : Router,
    private dialog_service  : DialogService,
    private snack_bar_service : SnackService
  ) { }

  private getData() {
    this.service.getResumoForListing().then((dado) => {
      this.consultas_listagem  = dado;
    });
  }

  ngOnInit() {
    this.getData();
  }

  visualizar (id: string) {
    this.router.navigate(['/pedilandia/consulta/', id]);
  }

  editar ( id: string ) {
    this.router.navigate([ '/pedilandia/consulta/editar/', id ]);
  }

  excluir ( consulta: Consulta ) {
      this.dialog_service
          .open_confirmation_dialog(
            `Tem certeza que deseja excluir a consulta?`
          )
          .subscribe((resposta) => {
            if ( resposta ) {
              this.service
                  .delete((consulta._id))
                  .then((dado) => {
                    if ( dado ) { 
                      this.getData();
                      this.snack_bar_service
                          .open_snack_bar(
                             'Consulta excluída!',
                             'success'
                          );
                    } else 
                      throw 'erro de exclusão';
                  })
                  .catch((error) => {
                    this.snack_bar_service
                        .open_snack_bar(
                          'Algum problema ocorreu',
                          'danger'
                        )
                  })
            } 
          });
  }

}
