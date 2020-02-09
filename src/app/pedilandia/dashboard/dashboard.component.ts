import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as canvas from './canvasjs.min';
import { ConsultaService } from '../consulta/consulta.service';
import { Consulta } from '../consulta/consulta.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public title: string;

  private consultas: any[];
  private consultasAmanha : any[];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private consultaService: ConsultaService,
    private router: Router,
    private authService : AuthService
  ) {
    this.getDados();
  }

  async getDados() {
    
    const dados = await this.consultaService.getQtConsultasPorSintoma(this.authService.usuarioLogado.value.usuario);
    console.log(dados);

  }

  ngOnInit() {

    let chart = new canvas.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular",
        fontSize: 16
      },
      axisY:{
        labelFontSize: 14,
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
        ]
      }]
    });
    chart.render();

    // let chart_b = new canvas.Chart("chartContainerB", {
    //   theme: "light2",
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title:{
    //     text: "Monthly Expense"
    //   },
    //   data: [{
    //     type: "pie",
    //     showInLegend: true,
    //     toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
    //     indexLabel: "{name} - #percent%",
    //     dataPoints: [
    //       { y: 450, name: "Food" },
    //       { y: 120, name: "Insurance" },
    //       { y: 300, name: "Traveling" },
    //       { y: 800, name: "Housing" },
    //       { y: 150, name: "Education" },
    //       { y: 150, name: "Shopping"},
    //       { y: 250, name: "Others" }
    //     ]
    //   }]
    // });
      
    // chart_b.render()

    this.title = 'hoje';

    this.consultaService.getResumoForListing().then((dados: Consulta[]) => {
      let date: Date = new Date();

      let date_consulta: Date = new Date();

      this.consultas = dados.filter(consulta => { 
        date_consulta = new Date(consulta.dataAgendada);
        return date_consulta.getDate() == date.getDate() &&
               date_consulta.getMonth() == date.getMonth() &&
               date_consulta.getFullYear() == date.getFullYear()

      });


      this.consultasAmanha =  
      dados.filter(consulta => { 
          date_consulta = new Date(consulta.dataAgendada);
            date_consulta.setHours(0,0,0,0);

            let minDate : Date = new Date(date);
            minDate.setHours(0,0,0,0);


            
            minDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000)
            let maxDate = new Date(minDate.getTime() + 48 * 60 * 60 * 1000)
            
            return  minDate.getTime() <= date_consulta.getTime() &&  
                    date_consulta.getTime() < maxDate.getTime();

        });

    })

  }

  iniciar(id : string) {
    this.router.navigate(['/pedilandia/realizar-consulta/', id])
}

}
