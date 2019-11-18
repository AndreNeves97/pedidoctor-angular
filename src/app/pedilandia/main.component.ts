import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { AuthService } from '../common/security/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
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
        route: './'
    },
    {
        name: 'Agendar consulta',
        route: './agendar-consulta',
        id: '3A'
    },
    {
        name: 'Agendamentos',
        route: './consultas',
        id: '3A'
    },
    {
        name: 'Clinicas',
        route: './clinica',
        id: '3A'
    },    
    {
        name: 'Usuarios',
        id: '3A',
        route: './usuarios',
        role: 'admin'
    },
    {
        name: 'Configurações',
        role: 'admin',
        children: [
            {
                name: 'Sintomas',
                route: './sintoma',
                id: '3A'
            },
            {
                name: 'Doencas',
                route: './doenca',
                id: '3A'
            },
            {
                name: 'Medicamentos',
                route: './medicamento',
                id: '3A'
            },
            {
                name: 'Diagnósticos',
                route: './tipos-diagnostico',
                id: '3A'
            },
            {
                name: 'Exames',
                route: './tipos-exame',
                id: '3A'
            },
            {
                name: 'Tipos de consulta',
                route: './tipos-consulta',
                id: '3A'
            },
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

    isHandset$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private content;

    @ViewChild('content', {static: false})
    set _content(content) {
        this.content = content;
    }



    @ViewChild('drawer', {static: false}) 
    drawerRef: any;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private auth: AuthService
    ) {
        this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        ).subscribe(v => this.isHandset$.next(v));


        this.router.events.subscribe((event : Event ) => {
            if(event instanceof NavigationEnd) {
                if(this.content != undefined) {
                    this.content.elementRef.nativeElement.scrollTo(0 ,0);
                }
            }
        })
    }

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
        // this.router.navigate([component.route]);

        if(component.route != undefined && this.isHandset$.value == true)
            this.drawerRef.toggle();
    }



    menuOpenedChange(opened) {
        this.menuOpened = opened;
    }


    menuOpenedStart() {
        this.menuOpened = !this.menuOpened;
    }
}
