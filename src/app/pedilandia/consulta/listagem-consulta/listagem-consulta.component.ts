import { Consulta } from './../consulta.model';
import { ConsultaService } from './../consulta.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-listagem-consulta',
  templateUrl: './listagem-consulta.component.html',
  styleUrls: ['./listagem-consulta.component.scss']
})
export class ListagemConsultaComponent implements OnInit {

  private consultas_listagem: Consulta[];

  displayedColumns: string[] = ['data', 'nomePaciente', 'tipoConsulta', 'options'];

  constructor(
    private consultaService: ConsultaService
  ) { }

  private getData() {
    this.consultaService.getResumoForListing().then((dado) => {
      this.consultas_listagem  = dado;
    });
  }

  ngOnInit() {
    setTimeout(()=>{
      this.getData();
    }, 3000);
  }

}
