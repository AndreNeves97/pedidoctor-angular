import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/security/auth.service';
import { DialogUserInfoComponent } from '../dialog-user-info/dialog-user-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-toolbar-user-avatar',
    templateUrl: './toolbar-user-avatar.component.html',
    styleUrls: ['./toolbar-user-avatar.component.scss']
})
export class ToolbarUserAvatarComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
    }

    async login() {
        this.auth.signInWithGoogle();
    }

    logout() {
        this.auth.signOut();
    }


  openUserDialog() {
    const dialogRef = this.dialog.open(DialogUserInfoComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'signOut') {
          this.logout();
      }
    })

  }



}
