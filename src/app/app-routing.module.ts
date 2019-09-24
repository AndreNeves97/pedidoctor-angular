import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { mainRoutes } from './main/main-routing.module';
import { MainPedilandiaComponent } from './pedilandia/main.component';
import { pedilandiaRoutes } from './pedilandia/pedilandia-routing.module';
import { MainSupperComponent } from './supper/main.component';
// import { CadastroUsuarioComponent } from './pedi'

const routes: Routes = [
    {
        path: '', 
        component: MainComponent,
        children: mainRoutes
    },
    {
        path: 'pedilandia',
        component: MainPedilandiaComponent,
        children: pedilandiaRoutes
    },
    {
        path: 'supper',
        component: MainSupperComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
