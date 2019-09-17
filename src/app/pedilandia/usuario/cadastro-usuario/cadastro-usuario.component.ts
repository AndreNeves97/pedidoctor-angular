import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario: Usuario;


  constructor() { 
    // this.usuario = new Usuario("Leonam", "leonam@gmail.com", "senha", "32165498")
    this.usuario = new Usuario()

  }

  ngOnInit() {
  }

}
