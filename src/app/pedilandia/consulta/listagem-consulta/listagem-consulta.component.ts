import { Consulta } from './../consulta.model';
import { ConsultaService } from './../consulta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { AuthService } from 'src/app/common/security/auth.service';
import { LoginUsuarioStatus } from 'src/app/common/security/usuario.model';


@Component({
    selector: 'app-listagem-consulta',
    templateUrl: './listagem-consulta.component.html',
    styleUrls: ['./listagem-consulta.component.scss']
})
export class ListagemConsultaComponent implements OnInit {

    waiting : boolean

    private consultas_listagem: Consulta[];

    displayedColumns: string[] = ['data', 'nomeClinica', 'nomeMedico', 'nomePaciente', 'tipoConsulta', 'options'];

    constructor(
        private service: ConsultaService,
        private router: Router,
        private dialog_service: DialogService,
        private snack_bar_service: SnackService,
        private authService : AuthService
    ) {

        this.authService.usuarioLogado.subscribe(v => {
            if(v.status == LoginUsuarioStatus.LOGADO && v.usuario.roles.includes('admin')) {
                this.displayedColumns = ['data', 'nomeClinica', 'nomeMedico', 'nomePaciente', 'tipoConsulta', 'options'];
            } else {
                this.displayedColumns = ['data', 'nomeClinica', 'nomeMedico', 'tipoConsulta', 'user-options'];
            }
        })
    }

    private check_if_today ( consulta: Consulta ) {
        let today: Date = new Date();
        let date: Date;
        date = new Date(consulta.dataAgendada);
        
        today.setHours(0,0,0,0);
        date.setHours(0,0,0,0);

        if ( date.getTime() > today.getTime())
            return 1
        else if ( date.getTime() < today.getTime())
            return -1
        else
            return 0;

    }

    private getData() {
        this.consultas_listagem = null;
        
        this.service.getResumoForListing().then((dado) => {
            this.consultas_listagem = dado;
        });
    }

    ngOnInit() {
        this.waiting = false;
        this.getData();
    }

    iniciar(id : string) {
        this.router.navigate(['/pedilandia/realizar-consulta/', id])
    }

    visualizar(id: string) {
        this.router.navigate(['/pedilandia/consulta/', id]);
    }

    editar(id: string) {
        this.router.navigate(['/pedilandia/consulta/editar/', id]);
    }

    excluir(consulta: Consulta) {
        this.dialog_service
            .open_confirmation_dialog(
                `Tem certeza que deseja excluir a consulta?`
            )
            .subscribe((resposta) => {
                if (resposta) {
                    this.waiting = true;

                    this.service
                        .delete((consulta._id))
                        .then((dado) => {
                            if (dado) {
                                this.waiting = false;
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
