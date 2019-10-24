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
import { MainSintomaComponent } from './sintomas/main-sintoma/main-sintoma.component';
import { DetalheSintomaComponent } from './sintomas/detalhe-sintoma/detalhe-sintoma.component';
import { UpdateSintomaComponent } from './sintomas/update-sintoma/update-sintoma.component';
import { MainDoencaComponent } from './doencas/main-doenca/main-doenca.component';
import { DetalheDoencaComponent } from './doencas/detalhe-doenca/detalhe-doenca.component';
import { UpdateDoencaComponent } from './doencas/update-doenca/update-doenca.component';
import { MainMedicamentoComponent } from './medicamentos/main-medicamento/main-medicamento.component';
import { DetalheMedicamentoComponent } from './medicamentos/detalhe-medicamento/detalhe-medicamento.component';
import { UpdateMedicamentoComponent } from './medicamentos/update-medicamento/update-medicamento.component';
import { DetalheConsultaTipoComponent } from './consulta-tipo/detalhe-consulta-tipo/detalhe-consulta-tipo.component';
import { MainConsultaTipoComponent } from './consulta-tipo/main-consulta-tipo/main-consulta-tipo.component';
import { UpdateConsultaTipoComponent } from './consulta-tipo/update-consulta-tipo/update-consulta-tipo.component';
import { MainDiagnosticoTipoComponent } from './diagnostico-tipo/main-diagnostico-tipo/main-diagnostico-tipo.component';
import { DetalheDiagnosticoTipoComponent } from './diagnostico-tipo/detalhe-diagnostico-tipo/detalhe-diagnostico-tipo.component';
import { UpdateDiagnosticoTipoComponent } from './diagnostico-tipo/update-diagnostico-tipo/update-diagnostico-tipo.component';
import { MainExameTipoComponent } from './exame-tipo/main-exame-tipo/main-exame-tipo.component';
import { DetalheExameTipoComponent } from './exame-tipo/detalhe-exame-tipo/detalhe-exame-tipo.component';
import { UpdateExameTipoComponent } from './exame-tipo/update-exame-tipo/update-exame-tipo.component';


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
    },
    {
        path: 'sintoma',
        component: MainSintomaComponent
    },
    {
        path: 'sintoma/:id',
        component: DetalheSintomaComponent
    },
    {
        path: 'sintoma/editar/:id',
        component: UpdateSintomaComponent
    },
    {
        path: 'doenca',
        component: MainDoencaComponent
    },
    {
        path: 'doenca/:id',
        component: DetalheDoencaComponent
    },
    {
        path: 'doenca/editar/:id',
        component: UpdateDoencaComponent
    },
    
    {
        path: 'medicamento',
        component: MainMedicamentoComponent
    },
    {
        path: 'medicamento/:id',
        component: DetalheMedicamentoComponent
    },
    {
        path: 'medicamento/editar/:id',
        component: UpdateMedicamentoComponent
    },
    
    {
        path: 'tipos-consulta',
        component: MainConsultaTipoComponent
    },
    {
        path: 'tipos-consulta/:id',
        component: DetalheConsultaTipoComponent
    },
    {
        path: 'tipos-consulta/editar/:id',
        component: UpdateConsultaTipoComponent
    },
    
    {
        path: 'tipos-diagnostico',
        component: MainDiagnosticoTipoComponent
    },
    {
        path: 'tipos-diagnostico/:id',
        component: DetalheDiagnosticoTipoComponent
    },
    {
        path: 'tipos-diagnostico/editar/:id',
        component: UpdateDiagnosticoTipoComponent
    },
    
    {
        path: 'tipos-exame',
        component: MainExameTipoComponent
    },
    {
        path: 'tipos-exame/:id',
        component: DetalheExameTipoComponent
    },
    {
        path: 'tipos-exame/editar/:id',
        component: UpdateExameTipoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PedilandiaRoutingModule { }

export const pedilandiaRoutes = routes;