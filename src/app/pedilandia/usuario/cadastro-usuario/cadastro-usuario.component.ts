import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  private usuario: Usuario;

  public telefone_mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor() { 
    this.usuario = new Usuario("Leonam", "leonam@gmail.com", "senha", "(31)32165-4098")
  }

  ngOnInit() {}

  public limpar() {
    this.usuario = new Usuario();
  }

}
