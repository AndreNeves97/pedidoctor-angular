import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../medicamento.model';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-listagem-medicamento',
  templateUrl: './listagem-medicamento.component.html',
  styleUrls: ['./listagem-medicamento.component.scss']
})
export class ListagemMedicamentoComponent implements OnInit {

  private medicamentos: Medicamento[];

  private colunas_mostradas: string[] = [
    'nome', 'descricao', 'options'
  ];

  constructor(
    private service           : MedicamentoService,
    private router            : Router,
    private dialog_service    : DialogService,
    private snack_bar_service : SnackService
  ) { }

  ngOnInit() {

    this.medicamentos = [];

    setTimeout(() => {
      this.get_data();
    }, 1200)

  }

  private get_data (): void {

    this.service
        .findAll_resumo()
        .then((medicamentos: Medicamento[]) => {
          this.medicamentos = medicamentos;
        });

  }

  private visualizar ( id: string ): void {
    this.router.navigate(['/pedilandia/medicamento/', id]);
  }

  private editar ( id: string ): void {
    this.router.navigate([ '/pedilandia/medicamento/editar/', id ]);
  }

  private excluir ( medicamento: Medicamento ): void {

    this.dialog_service
        .open_confirmation_dialog(
          `Tem certeza que deseja excluir o medicamento ${ medicamento.nome }?`
        )
        .subscribe((resposta)=>{
          if ( resposta ) {
            this.service
                .delete(medicamento._id)
                .then((dado)=>{
                  if ( dado ) { 
                    this.get_data();
                    this.snack_bar_service
                        .open_snack_bar(
                          'Medicamento excluído!',
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
