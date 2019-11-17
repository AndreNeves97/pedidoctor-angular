import { Component, OnInit, Input } from '@angular/core';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmacao-consulta',
  templateUrl: './confirmacao-consulta.component.html',
  styleUrls: ['./confirmacao-consulta.component.scss']
})
export class ConfirmacaoConsultaComponent implements OnInit {

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
