import { Component, OnInit } from '@angular/core';
import { Enfermeiro } from '../enfermeiro.model';
import { EnfermeiroService } from '../enfermeiro.service';

@Component({
  selector: 'app-cadastro-enfermeiro',
  templateUrl: './cadastro-enfermeiro.component.html',
  styleUrls: ['./cadastro-enfermeiro.component.scss']
})
export class CadastroEnfermeiroComponent implements OnInit {
  private enfermeiro: Enfermeiro;

  private teste: boolean = true; 

  private telefone_mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    private enfermeiroService: EnfermeiroService
  ) { }

  ngOnInit() {
    this.enfermeiro = new Enfermeiro({
      _id : "",
      email: "",
      fotoUrl: "",
      jwt: "",
      nome: "",
      telefone: ""
    })
  }

  public limpar() {
    this.enfermeiro = new Enfermeiro({
      _id : "",
      email: "",
      fotoUrl: "",
      jwt: "",
      nome: "",
      telefone: ""
    });
  }

  private cadastrar() {
    this.enfermeiroService.insert(this.enfermeiro).then((dado)=>{
      if ( dado ) {
        console.log(dado);
      }
    });
  }
}
