import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../consulta.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Consulta } from '../consulta.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe-consulta',
  templateUrl: './detalhe-consulta.component.html',
  styleUrls: ['./detalhe-consulta.component.scss']
})
export class DetalheConsultaComponent implements OnInit {

  private consulta: Consulta;

  constructor(
    private service :   ConsultaService,
    private router  :   Router,
    private route   :   ActivatedRoute
  ) { 

    this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return of(params.get('id'));
          })
        ).subscribe((id: string) => {
          this.service.find(id).then((consulta: Consulta) =>{
            if ( consulta )
              this.consulta = consulta;
            else
              this.navigate_back();
          })
        });

  }

  ngOnInit() { 
    this.consulta = new Consulta();
  }

  private navigate_back() {
    this.router.navigate(['/pedilandia/consultas']);
  }

  get dataConsulta () {
    return this.consulta.dataConsulta;
  }

  get horario () {
    return `${new Date(this.consulta.dataConsulta).getHours()}:${new Date(this.consulta.dataConsulta).getMinutes()}`
  }

  get paciente () {
    return this.consulta.paciente;
  }

  get clinica () {
    return this.consulta.clinica;
  }

  get medico () {
    return this.consulta.medico;
  }

  get medicamentosQueToma () {
    if (this.consulta.medicamentosQueToma)
      return this.consulta.medicamentosQueToma;
    else 
      return [];
  }

  get doencasRecentes () {
    if (this.consulta.doencasRecentes)
      return this.consulta.doencasRecentes
    else  
      return [];
  }

  get informacoesAdicionais () { 
    return this.consulta.informacoesAdicionais;
  }

  get sintomasObservados () {
    if (this.consulta.sintomasObservados)
      return this.consulta.sintomasObservados;
    else 
      return [];
  }

  get tipoConsulta () {
    return this.consulta.tipoConsulta;
  }

}
