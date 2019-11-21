import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/security/auth.service';

@Component({
	selector: 'app-change-password-dialog',
	templateUrl: './change-password-dialog.component.html',
	styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

	form : FormGroup;


	constructor(
		private fb : FormBuilder,
		private auth : AuthService
	) {
		this.form = fb.group({
			senhaAntiga: ["", [Validators.required, Validators.minLength(6)]],
			novaSenha: ["", [Validators.required, Validators.minLength(6)]],
			confirmacaoNovaSenha: ["", [Validators.required, Validators.minLength(6)]]
		});
	}

	ngOnInit() {
	}

	click() {
		
	}

}
