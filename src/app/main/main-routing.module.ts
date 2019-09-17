import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../main/home/home.component';
import { CadastroUsuarioComponent } from '../pedilandia/usuario/cadastro-usuario/cadastro-usuario.component';
import { CadastroConsultaComponent } from './../pedilandia/consulta/cadastro-consulta/cadastro-consulta.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'pedilandia/usuario', component: CadastroUsuarioComponent},
    {path: 'pedilandia/consulta', component: CadastroConsultaComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

export const  mainRoutes = routes;