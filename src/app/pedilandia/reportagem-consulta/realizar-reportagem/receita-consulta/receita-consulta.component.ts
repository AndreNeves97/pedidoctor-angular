import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Consulta } from 'src/app/pedilandia/consulta/consulta.model';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-receita-consulta',
  templateUrl: './receita-consulta.component.html',
  styleUrls: ['./receita-consulta.component.scss']
})
export class ReceitaConsultaComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = false;

  private medicamentos_selected   : any[];

  private form: FormGroup;

  private _consulta: Consulta;

  constructor() { }

  ngOnInit() { 
    this.medicamentos_selected = [];
  }

  @Input()
  set form_group ( form_group: FormGroup ) {
    this.form = form_group;
  }

  @Input()
  set consulta ( consulta: Consulta ) {
    this._consulta = consulta;
  }

  public add_medicamento(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
        this.medicamentos_selected.push({ name : value.trim() })
    }

    if ( input ) {
        input.value = '';
    }

    this.form.patchValue({
        medicamentos : this.medicamentos_selected
    });
  }

  public remove_medicamentos(medicamento) {
    const index = this.medicamentos_selected.indexOf(medicamento);
    
    if ( index >= 0 ) {
        this.medicamentos_selected.splice(index, 1);
    }

    this.form.patchValue({
      medicamentos : this.medicamentos_selected
    });
  }

}
