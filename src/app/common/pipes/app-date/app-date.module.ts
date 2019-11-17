import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppDatePipe } from './app-date.pipe';

@NgModule({
    declarations: [
        AppDatePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AppDatePipe
    ],
    providers: [
        DatePipe
    ]
})
export class AppDateModule { }
