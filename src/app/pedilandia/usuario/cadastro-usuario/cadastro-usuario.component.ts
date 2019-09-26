import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../common/security/usuario.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  private usuario: Usuario;

  private teste: boolean = true; 

  private telefone_mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    private usuarioService: UsuarioService
  ) { 
    this.usuario = new Usuario({
        _id : null,
        email: null,
        fotoUrl: null,
        jwt: null,
        nome: null,
        telefone: null
    })
  }

  ngOnInit() {}

  public limpar() {
    this.usuario = new Usuario({
        _id : null,
        email: null,
        fotoUrl: null,
        jwt: null,
        nome: null,
        telefone: null
    });
  }

  private cadastrar() {
    this.usuarioService.insert(this.usuario).then((dado)=>{
      if ( dado ) {
        console.log(dado);
      }
    });
  }

}
