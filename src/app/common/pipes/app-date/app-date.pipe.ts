import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'appDate'
})
export class AppDatePipe implements PipeTransform {

    constructor(
        private datePipe : DatePipe
    ) { }

    transform(value: any, ...args: any[]): any {
        const year = new Date(value).getFullYear();
        const curYear = new Date().getFullYear();

        let format;

        if(args.includes('lean-view')) {
            format = 'dd/MM/yyyy';
            
            if(year == curYear)
                format = 'dd/MM';

            if(args.includes('with-hour'))
                format += ' \'às\' HH:mm';
        } else {
            format = 'dd \'de\' MMMM \'de\' yyyy';
            
            if(year == curYear)
                format = 'dd \'de\' MMMM';

            if(args.includes('with-hour'))
                format += ' \'às\' hh:mm';
        }

        
        return this.datePipe.transform(value, format);
    }
}
