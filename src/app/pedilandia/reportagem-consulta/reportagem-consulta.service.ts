import { Injectable } from '@angular/core';
import { Consulta }   from '../consulta/consulta.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportagemConsultaService {

  private source = new BehaviorSubject<Consulta>(new Consulta());

  constructor() { }

  public get_consulta ( ) { 
    return this.source.asObservable();
  }

  public update( consulta: Consulta ) {
    this.source.next(consulta);
  }

}
