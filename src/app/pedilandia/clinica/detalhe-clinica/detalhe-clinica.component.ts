import { Component, OnInit } from '@angular/core';
import { Clinica } from '../clinica.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClinicaService } from '../clinica.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe-clinica',
  templateUrl: './detalhe-clinica.component.html',
  styleUrls: ['./detalhe-clinica.component.scss']
})
export class DetalheClinicaComponent implements OnInit {

  private clinica: Clinica = new Clinica();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ClinicaService
  ) { 

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'));
        })
      )
      .subscribe((id: string) => {
        this.service.find(id).then((clinica: Clinica) => {
          if ( !clinica ) this.navigate_back();
          else this.clinica = clinica;
        })
      });

  }
    
  ngOnInit() {
    this.clinica = new Clinica();
  }

  navigate_back () {
    this.router.navigate(['/pedilandia/clinica']);
  }

}
