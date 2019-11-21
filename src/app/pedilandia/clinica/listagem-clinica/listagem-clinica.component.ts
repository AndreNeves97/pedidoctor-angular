import { Component, OnInit, Inject } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ClinicaService } from '../clinica.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/common/utils/dialog/dialog.service';
import { SnackService } from 'src/app/common/utils/snack/snack.service';
import { AuthService } from 'src/app/common/security/auth.service';
import { LoginUsuarioStatus } from 'src/app/common/security/usuario.model';

@Component({
    selector: 'app-listagem-clinica',
    templateUrl: './listagem-clinica.component.html',
    styleUrls: ['./listagem-clinica.component.scss']
})
export class ListagemClinicaComponent implements OnInit {

    private clinicas: Clinica[];

    private colunas_mostradas: string[] = [
        'nome', 'endereco'
    ];

    constructor(
        private service: ClinicaService,
        private router: Router,
        private dialog_service: DialogService,
        private snack_bar_service: SnackService,
        private authService : AuthService
    ) {
        this.authService.usuarioLogado.subscribe(v => {
            if(v.status == LoginUsuarioStatus.LOGADO && v.usuario.roles.includes('admin')) {
                this.colunas_mostradas = ['nome', 'endereco', 'options']
            } else {
                this.colunas_mostradas = ['nome', 'endereco', 'view-option']
            }
        })
    }

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.clinicas = null;
        this.service.findAll().then((dado: Clinica[]) => {
              this.clinicas = dado;
        });
    }

    private visualizar(id: string) {
        this.router.navigate(['/pedilandia/clinica/', id])
    }

    private editar(id: string) {
        this.router.navigate(['/pedilandia/clinica/editar/', id])
    }

    private excluir(clinica: Clinica) {

        this.dialog_service
            .open_confirmation_dialog(`Tem certeza que deseja excluir a clínica ${clinica.nome}?`)
            .subscribe(resposta => {
                if (resposta) {
                    this.service.deleteClinica(clinica._id).then((dado) => {
                        if (dado) {
                            this.getData();
                            this.snack_bar_service.open_snack_bar('Clínica excluída', 'success');
                        } else
                            throw 'erro de exclusão';
                    }).catch(error => {
                        this.snack_bar_service.open_snack_bar('Algum problema ocorreu', 'danger');
                    });
                }
            })

    }

}