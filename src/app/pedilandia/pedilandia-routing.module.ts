import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroConsultaComponent } from './consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroClinicaComponent } from './clinica/cadastro-clinica/cadastro-clinica.component';
import { CadastroMedicoComponent } from './medico/cadastro-medico/cadastro-medico.component';
import { CadastroEnfermeiroComponent } from './enfermeiro/cadastro-enfermeiro/cadastro-enfermeiro.component';


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
        component: CadastroClinicaComponent
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