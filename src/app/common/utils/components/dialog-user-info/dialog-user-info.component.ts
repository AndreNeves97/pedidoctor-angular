import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/common/security/auth.service';
import { ChangePasswordDialogService } from '../change-password-dialog/change-password-dialog.service';

@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss']
})
export class DialogUserInfoComponent  {

    constructor(
        private auth: AuthService,
        public dialogRef: MatDialogRef<DialogUserInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private changePasswordDialogService : ChangePasswordDialogService
    ) {
    }

    close() {
        this.dialogRef.close();
    }
    

    alterarSenha() {
        this.changePasswordDialogService.show()
    }

    sair() {
        this.auth.signOut();
        this.close()
    }

}
