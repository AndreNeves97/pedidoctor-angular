import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  name: string;
  id: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Home',
        id: '0',
        children: [ ]
    }, {
        name: 'Feast',
        id: '1',
        children: []
    }, {
        name: 'Supper',
        id: '2',
        children: []
    },{
        name: 'Pedilandia',
        id: '3',
        children: [
            { 
                name: 'Usuario',
                id: '3A' 
            },
            { 
                name: 'Consulta',
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

    constructor(private breakpointObserver: BreakpointObserver) {
    this.dataSource.data = TREE_DATA;
     }

    ngOnInit() {
    }

     private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
