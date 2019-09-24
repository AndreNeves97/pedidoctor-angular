import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss']
})
export class DialogUserInfoComponent  {

    constructor(
        private auth: AuthService,
        public dialogRef: MatDialogRef<DialogUserInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    close() {
        this.dialogRef.close();
    }

}
