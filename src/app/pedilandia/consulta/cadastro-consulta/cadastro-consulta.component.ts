import { TipoConsulta } from './../../util/tipo-consulta.enum';
import { Consulta } from './../consulta.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/usuario.model';

@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.scss']
})
export class CadastroConsultaComponent implements OnInit {

  private consulta: Consulta;

  private tipoConsultaOptions: any[];

  constructor() {
    this.consulta = new Consulta(new Date(), new Date(), new Usuario( "Leonam", "leonam@gmail.com", "senha", "(31)32165-4098"), "Diagnóstico", "Dor de cabeça", "Gadernal", "Gordo", "Sedentário");
  }

  ngOnInit() { 
    this.tipoConsultaOptions = Object.keys(TipoConsulta).map((tipoConsulta) => {
      return {
        label: tipoConsulta,
        value: tipoConsulta
      }
    });
  }

  public limpar () {
    this.consulta = new Consulta();
  }
 
}
