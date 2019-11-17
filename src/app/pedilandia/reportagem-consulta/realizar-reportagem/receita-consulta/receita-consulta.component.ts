import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';

@Component({
  selector: 'app-receita-consulta',
  templateUrl: './receita-consulta.component.html',
  styleUrls: ['./receita-consulta.component.scss']
})
export class ReceitaConsultaComponent implements OnInit {

  private form: FormGroup;

  private _consulta: Consulta;

  constructor() { }

  ngOnInit() { }

  @Input()
  set form_group ( form_group: FormGroup ) {
    this.form = form_group;
  }

  @Input()
  set consulta ( consulta: Consulta ) {
    this._consulta = consulta;
  }
  
}
