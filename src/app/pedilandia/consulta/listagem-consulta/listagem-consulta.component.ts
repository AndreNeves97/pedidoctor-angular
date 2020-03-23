import { Consulta } from './../consulta.model';
import { ConsultaService } from './../consulta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { AuthService } from 'src/app/common/security/auth.service';
import { LoginUsuarioStatus } from 'src/app/common/security/usuario.model';
import { FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-listagem-consulta',
    templateUrl: './listagem-consulta.component.html',
    styleUrls: ['./listagem-consulta.component.scss']
})
export class ListagemConsultaComponent implements OnInit {

    waiting : boolean

    private consultas_listagem: Consulta[];
    private consultas_listagem_filtered: BehaviorSubject<Consulta[]> = new BehaviorSubject<Consulta[]>(null);

    displayedColumns: string[] = ['data', 'nomeClinica', 'nomeMedico', 'nomePaciente', 'tipoConsulta', 'options'];

    pesquisaCtrl = new FormControl();


    constructor(
        private service: ConsultaService,
        private router: Router,
        private dialog_service: DialogService,
        private snack_bar_service: SnackService,
        private authService : AuthService
    ) {

        this.authService.usuarioLogado.subscribe(v => {
            this.setColumns()
        });

        
        
        this.pesquisaCtrl.valueChanges.subscribe(v => {
            this.filter(v);
        })
    }

    filter(text) {
    
        this.consultas_listagem_filtered.next(
            this.consultas_listagem.filter(v => {
                if(text == null)
                    return true;

                return  v.paciente.nome.toLowerCase().includes(text) ||
                        v.clinica.nome.toLowerCase().includes(text) ||
                        v.tipo.nome.toLowerCase().includes(text) ||
                        v.medico.nome.toLowerCase().includes(text) 
            })
        )
    }

    setColumns() {
        const user  = this.authService.usuarioLogado.value;

        if(user.status == LoginUsuarioStatus.LOGADO && user.usuario.roles.includes('admin') ) {
            this.displayedColumns = ['data', 'nomeClinica', 'nomeMedico', 'nomePaciente', 'tipoConsulta', 'options'];
        } else {

            this.displayedColumns = ['data', 'nomeClinica', 'nomeMedico', 'tipoConsulta', 'user-options'];

            if(this.consultas_listagem != null) {
                let isMedico = true;


                this.consultas_listagem.forEach(v => {
                    if(v.medico._id !== user.usuario._id)
                        isMedico = false
                })

                if(isMedico) {
                    this.displayedColumns = ['data', 'nomeClinica', 'tipoConsulta', 'user-options'];
                } else {
                    this.displayedColumns = ['data', 'nomeClinica', 'nomePaciente', 'tipoConsulta', 'user-options'];

                }
            }
        }
    }

    private get_color( consulta : Consulta ) {
        const diff = this.diff_time(consulta);

        if(diff == 0) {

            return 'green';

        } else if(diff == -1 && consulta.realizacao == null) {
            
            return 'red';

        } else {

            return 'black';

        }
    }

    private diff_time ( consulta: Consulta ) {
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

            this.filter(this.pesquisaCtrl.value);
            
            this.setColumns();
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
