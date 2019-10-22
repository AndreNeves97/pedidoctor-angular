import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  /**
   * Abre um dialog de confirmação com a respectiva mensagem
   * 
   * @param message mensagem de confirmação que por padrão é nula
   * 
   * @returns true se for sim, e undefined se for não
   */  
  open_confirmation_dialog ( message: string ) {
    const dial = this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });

    return dial.afterClosed()
  }

}
