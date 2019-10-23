import { Component, OnInit } from '@angular/core';
import { Sintoma } from '../sintoma.model';
import { SintomaService } from '../sintoma.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';

@Component({
  selector: 'app-listagem-sintoma',
  templateUrl: './listagem-sintoma.component.html',
  styleUrls: ['./listagem-sintoma.component.scss']
})
export class ListagemSintomaComponent implements OnInit {

  private sintomas: Sintoma[];

  private displayed_columns: string[] = [ 
    'nome', 'descricao', 'options'
  ]

  constructor(
    private service:           SintomaService,
    private router:            Router,
    private dialog_service:    DialogService,
    private snack_bar_service: SnackService
  ) { }

  ngOnInit() {

    this.sintomas = [];

    setTimeout(() => {
      this.get_data();
    }, 1200);

  }

  private get_data (): void {

    this.service
        .findAll()
        .then((sintomas: Sintoma[]) => {

          console.table(sintomas);

          this.sintomas = sintomas;
        });

  }

  private visualizar ( id: string ): void {
    this.router.navigate(['/pedilandia/sintoma/', id]);
  }

  private editar ( id: string ): void {
    this.router.navigate(['/pedilandia/sintoma/editar/', id]);
  }

  private excluir ( sintoma: Sintoma ): void {

    this.dialog_service
        .open_confirmation_dialog(
          `Tem certeza que deseja excluir o sintoma ${sintoma.nome}`)
        .subscribe((resposta) => {
          if ( resposta ) {
            this.service
                .delete( sintoma._id )
                .then((dado) => {
                  if ( dado ) {
                    this.get_data();
                    this.snack_bar_service
                        .open_snack_bar(
                          'Sintoma excluído', 
                          'success'
                        );
                  } else 
                    throw 'erro de exclusão';
                })
                .catch((error) => {
                  this.snack_bar_service
                      .open_snack_bar(
                        'Algum problema ocorreu.', 
                        'danger'
                      );
                });
          } 
        });

  }

}
