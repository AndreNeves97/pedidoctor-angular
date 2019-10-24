import { Component, OnInit } from '@angular/core';
import { ConsultaTipo } from '../consulta-tipo.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { ConsultaTipoService } from '../consulta-tipo.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-listagem-consulta-tipo',
  templateUrl: './listagem-consulta-tipo.component.html',
  styleUrls: ['./listagem-consulta-tipo.component.scss']
})
export class ListagemConsultaTipoComponent implements OnInit {

    private objs: ConsultaTipo[];

    private colunas_mostradas: string[] = [
      'nome', 'descricao', 'options'
    ];
  
    constructor(
      private service:           ConsultaTipoService,
      private router:            Router,
      private dialog_service:    DialogService,
      private snack_bar_service: SnackService
    ) { }
  
    ngOnInit() {
      this.objs = [];
      setTimeout(()=>{
        this.getData();
      }, 1000);
    }
  
    private getData () {
      this.service.findAll().then((dado: ConsultaTipo[])=>{
        this.objs = dado;
      });
    }
  
    private visualizar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-consulta/', id ])
    }
  
    private editar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-consulta/editar/', id ])
    }
  
    private excluir ( obj: ConsultaTipo ) {
  
      this.dialog_service
        .open_confirmation_dialog(`Tem certeza que deseja excluir o tipo de consulta ${obj.nome}?`)
        .subscribe(resposta => {
          if (resposta) {
            this.service.deleteClinica( obj._id ).then((dado)=>{
              if (dado) {
                this.getData();
                this.snack_bar_service.open_snack_bar('Tipo de consulta excluído', 'success');
              } else 
                throw 'erro de exclusão'; 
            }).catch(error=>{
              this.snack_bar_service.open_snack_bar('Algum problema ocorreu', 'danger');
            });
          }  
        })
  
    }

}
