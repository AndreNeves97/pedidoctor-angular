import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
	title: string;
	msg: string;
}

@Component({
	selector: 'app-message-dialog',
	templateUrl: './message-dialog.component.html',
	styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<MessageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) { }

	okClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
	}
}
