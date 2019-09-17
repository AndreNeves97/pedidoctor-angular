import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { mainRoutes } from './main/main-routing.module';
// import { CadastroUsuarioComponent } from './pedi'

const routes: Routes = [
    {
        path: '', component: MainComponent,
        
        children: mainRoutes
    }, 
    // {
      // path: '/pedilandia/usuario',
      // component: CadastroUsuarioComponent
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
