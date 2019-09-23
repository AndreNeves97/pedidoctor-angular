import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AuthService } from '../common/security/auth.service';

interface FoodNode {
  name: string;
  id: string;
  route: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Home',
        id: '0',
        route: '',
        children: [ ]
    }, {
        name: 'Feast',
        id: '1',
        route: '',
        children: []
    }, {
        name: 'Supper',
        id: '2',
        route: '',
        children: []
    },{
        name: 'Pedilandia',
        id: '3',
        route: null,
        children: [
            { 
                name: 'Usuario',
                id: '3A',
                route: 'pedilandia/usuario'
            },
            { 
                name: 'Consulta',
                route: 'pedilandia/consulta',
                id: '3A' 
            }
        ]
    }];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private auth : AuthService
    ) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit() {
    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            route: node.route,
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


    async login() {
        this.auth.signInWithGoogle();
    }
    
    logout() {
        this.auth.signOut();
    }

}
