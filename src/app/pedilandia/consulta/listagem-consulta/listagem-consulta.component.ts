import { Consulta } from './../consulta.model';
import { ConsultaService } from './../consulta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem-consulta',
  templateUrl: './listagem-consulta.component.html',
  styleUrls: ['./listagem-consulta.component.scss']
})
export class ListagemConsultaComponent implements OnInit {

  private consultas_listagem: Consulta[];

  displayedColumns: string[] = ['data', 'nomePaciente', 'tipoConsulta', 'options'];

  constructor(
    private consultaService: ConsultaService,
    private router: Router
  ) { }

  private getData() {
    this.consultaService.getResumoForListing().then((dado) => {
      this.consultas_listagem  = dado;
    });
  }

  ngOnInit() {
    this.getData();
  }

  visualizar () {

  }

  editar ( id: string ) {
    this.router.navigate([ '/pedilandia/consulta/editar/', id ]);
  }

  excluir () {
    
  }

}
