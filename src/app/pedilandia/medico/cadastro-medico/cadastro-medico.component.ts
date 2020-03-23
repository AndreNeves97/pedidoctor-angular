import { Component, OnInit } from '@angular/core';
import { Medico } from '../medico.model';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.scss']
})
export class CadastroMedicoComponent implements OnInit {

  private medico: Medico;

  private teste: boolean = true; 

  private telefone_mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    private medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.medico = new Medico({
      _id: "",
      nome: "",
      email: "",
      telefone: "",
      jwt: "",
      fotoUrl: ""
    })
  }

  public limpar() {
    this.medico = new Medico({
      _id: "",
      nome: "",
      email: "",
      telefone: "",
      jwt: "",
      fotoUrl: ""
    });
  }

  private cadastrar() {
    this.medicoService.insert(this.medico).then((dado)=>{
      if ( dado ) {
        
        setTimeout(() => {
          this.medico = new Medico({
            _id: "",
            nome: "",
            email: "",
            telefone: "",
            jwt: "",
            fotoUrl: ""
          })
        }
        , 500)  
      }
    });
  }

}
