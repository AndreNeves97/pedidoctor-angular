import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroConsultaComponent } from './consulta/cadastro-consulta/cadastro-consulta.component';


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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedilandiaRoutingModule { }

export const pedilandiaRoutes = routes;