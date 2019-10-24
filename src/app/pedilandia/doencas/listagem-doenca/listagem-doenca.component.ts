import { Component, OnInit } from '@angular/core';
import { Doenca } from '../doenca.model';
import { DoencaService } from '../doenca.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-listagem-doenca',
  templateUrl: './listagem-doenca.component.html',
  styleUrls: ['./listagem-doenca.component.scss']
})
export class ListagemDoencaComponent implements OnInit {

  private doencas: Doenca[];

  private colunas_mostradas: string[] =  [
    'nome', 'descricao', 'options'
  ];

  constructor(
    private service           : DoencaService,
    private router            : Router,
    private dialog_service    : DialogService,
    private snack_bar_service : SnackService
  ) { }

  ngOnInit() {

    this.doencas = [];

    setTimeout(() => {
      this.get_data();
    }, 1200)

  }

  private get_data (): void {

    this.service
        .findAll_resumo()
        .then((doencas: Doenca[]) => {
          this.doencas = doencas;
        });

  }

  private visualizar ( id: string ): void {
    this.router.navigate(['/pedilandia/doenca/', id]);
  }

  private editar ( id: string ): void {
    this.router.navigate([ '/pedilandia/doenca/editar/', id ]);
  }

  private excluir ( doenca: Doenca ): void {

    this.dialog_service
        .open_confirmation_dialog(
          `Tem certeza que deseja excluir a doença ${ doenca.nome }?`
        )
        .subscribe((resposta)=>{
          if ( resposta ) {
            this.service
                .delete(doenca._id)
                .then((dado)=>{
                  if ( dado ) { 
                    this.get_data();
                    this.snack_bar_service
                        .open_snack_bar(
                          'Doença excluída!',
                          'success'
                        );
                  } else  
                    throw 'erro de exclusão'
                })
                .catch((error) => {
                  this.snack_bar_service
                      .open_snack_bar(
                        'Algum problema ocorreu',
                        'danger'
                      );
                })
          } 
        });

  }

}
