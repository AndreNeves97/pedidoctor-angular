import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { ExameTipo } from '../exame-tipo.model';
import { ExameTipoService } from '../exame-tipo.service';

@Component({
  selector: 'app-listagem-exame-tipo',
  templateUrl: './listagem-exame-tipo.component.html',
  styleUrls: ['./listagem-exame-tipo.component.scss']
})
export class ListagemExameTipoComponent implements OnInit {

    private objs: ExameTipo[];

    private colunas_mostradas: string[] = [
      'nome', 'descricao', 'options'
    ];
  
    constructor(
      private service:           ExameTipoService,
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
      this.service.findAll().then((dado: ExameTipo[])=>{
        this.objs = dado;
      });
    }
  
    private visualizar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-exame/', id ])
    }
  
    private editar ( id: string ) {
      this.router.navigate(['/pedilandia/tipos-exame/editar/', id ])
    }
  
    private excluir ( obj: ExameTipo ) {
  
      this.dialog_service
        .open_confirmation_dialog(`Tem certeza que deseja excluir o tipo de exame ${obj.nome}?`)
        .subscribe(resposta => {
          if (resposta) {
            this.service.delete( obj._id ).then((dado)=>{
              if (dado) {
                this.getData();
                this.snack_bar_service.open_snack_bar('Tipo de exame excluído', 'success');
              } else 
                throw 'erro de exclusão'; 
            }).catch(error=>{
              this.snack_bar_service.open_snack_bar('Algum problema ocorreu', 'danger');
            });
          }  
        })
  
    }

}
