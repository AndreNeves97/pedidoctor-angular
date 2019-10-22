import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroConsultaComponent } from './consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroMedicoComponent } from './medico/cadastro-medico/cadastro-medico.component';
import { CadastroEnfermeiroComponent } from './enfermeiro/cadastro-enfermeiro/cadastro-enfermeiro.component';
import { MainClinicaComponent } from './clinica/main-clinica/main-clinica.component';
import { DetalheClinicaComponent } from './clinica/detalhe-clinica/detalhe-clinica.component';
import { UpdateClinicaComponent } from './clinica/update-clinica/update-clinica.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'usuario', 
        component: CadastroUsuarioComponent
    },
    {
        path: 'consulta', 
        component: CadastroConsultaComponent
    },
    {
        path: 'clinica', 
        component: MainClinicaComponent,
    },
    {
        path: 'clinica/:id',
        component: DetalheClinicaComponent
    },
    {
        path: 'clinica/editar/:id',
        component: UpdateClinicaComponent
    },
    {
        path: 'medico', 
        component: CadastroMedicoComponent
    },
    {
        path: 'enfermeiro', 
        component: CadastroEnfermeiroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedilandiaRoutingModule { }

export const pedilandiaRoutes = routes;