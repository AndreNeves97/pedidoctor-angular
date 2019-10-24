import { Component, OnInit } from '@angular/core';
import { DiagnosticoTipo } from '../diagnostico-tipo.model';
import { Router } from '@angular/router';
import { DiagnosticoTipoService } from '../diagnostico-tipo.service';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-listagem-diagnostico-tipo',
  templateUrl: './listagem-diagnostico-tipo.component.html',
  styleUrls: ['./listagem-diagnostico-tipo.component.scss']
})
export class ListagemDiagnosticoTipoComponent implements OnInit {

    private objs: DiagnosticoTipo[];

    private colunas_mostradas: string[] = [
      'nome', 'descricao', 'options'
    ];
  
    constructor(
      private service:           DiagnosticoTipoService,
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
      this.service.findAll().then((dado: DiagnosticoTipo[])=>{
        this.objs = dado;
      });
    }
  
    private visualizar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-diagnostico/', id ])
    }
  
    private editar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-diagnostico/editar/', id ])
    }
  
    private excluir ( obj: DiagnosticoTipo ) {
  
      this.dialog_service
        .open_confirmation_dialog(`Tem certeza que deseja excluir o tipo de diagnostico ${obj.nome}?`)
        .subscribe(resposta => {
          if (resposta) {
            this.service.delete( obj._id ).then((dado)=>{
              if (dado) {
                this.getData();
                this.snack_bar_service.open_snack_bar('Tipo de diagnostico excluído', 'success');
              } else 
                throw 'erro de exclusão'; 
            }).catch(error=>{
              this.snack_bar_service.open_snack_bar('Algum problema ocorreu', 'danger');
            });
          }  
        })
  
    }

}
