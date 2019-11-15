import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { AuthService } from '../common/security/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginUsuarioStatus } from '../common/security/usuario.model';



interface FoodNode {
    name: string;
    id?: string;
    route?: string;
    children?: FoodNode[];
    role? : string
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Dashboard',
        id: '3A',
        route: 'pedilandia'
    },
    {
        name: 'Agendar consulta',
        route: 'pedilandia/agendar-consulta',
        id: '3A'
    },
    {
        name: 'Consultas agendadas',
        route: 'pedilandia/consultas',
        id: '3A'
    },
    {
        name: 'Usuarios',
        id: '3A',
        route: 'pedilandia/usuario',
        role: 'admin'
    },
    {
        name: 'Clinicas',
        route: 'pedilandia/clinica',
        id: '3A'
    },    
    {
        name: 'Medico',
        route: 'pedilandia/medico',
        id: '3A'
    },
    {
        name: 'Enfermeiro(a)',
        route: 'pedilandia/enfermeiro',
        id: '3A'
    },
    {
        name: 'Configurações',
        role: 'admin',
        children: [
            {
                name: 'Sintomas',
                route: 'pedilandia/sintoma',
                id: '3A'
            },
            {
                name: 'Doenca',
                route: 'pedilandia/doenca',
                id: '3A'
            },
            {
                name: 'Medicamento',
                route: 'pedilandia/medicamento',
                id: '3A'
            },
            {
                name: 'Tipos de consulta',
                route: 'pedilandia/tipos-consulta',
                id: '3A'
            },
            {
                name: 'Tipos de diagnósticos',
                route: 'pedilandia/tipos-diagnostico',
                id: '3A'
            },
            {
                name: 'Tipos de exames',
                route: 'pedilandia/tipos-exame',
                id: '3A'
            }
        ]
    },
];

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}


@Component({
    selector: 'app-pedilandia-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainPedilandiaComponent implements OnInit {
    menuOpened;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.auth.usuarioLogado.subscribe(usuario => {
            this.dataSource.data = TREE_DATA.filter(node => {
                if(node.role == undefined)
                    return true;
                
                else if(    
                    usuario.status == LoginUsuarioStatus.LOGADO && 
                    usuario.usuario.roles.includes(node.role)
                )
                    return true;
                
                return false;
            })
        });
    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            route: node.route,
            role: node.role,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    click(component: any) {
        this.router.navigate([component.route]);
    }



    menuOpenedChange(opened) {
        this.menuOpened = opened;
    }


    menuOpenedStart() {
        this.menuOpened = !this.menuOpened;
    }
}
