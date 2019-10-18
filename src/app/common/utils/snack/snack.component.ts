import { Component, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styles: [`
    .example-pizza-party {
      // color: hotpink;
    }`
  ]
})
export class SnackComponent { 

  @Input()
  public message: string;

  @Input()
  public style: string = 'success';

  constructor (
    @Inject(MAT_SNACK_BAR_DATA) private data: any
  ) {
    if ( data.message )
      this.message = this.message ? this.message : data.message;
    if ( data.style )
      this.style = data.style;
  }

  private getStyle ( ) {
    switch ( this.style ) {
      case 'success' : {
        return { 
          'color': '#00e676' 
        };
      }
      case 'warning' : {
        return { 
          'color': '#ffff00'
        };
      }
      case 'danger' : {
        return { 
          'color': '#ff1744' 
        };
      }
      default : {
        return { 
          'color': '#00e676' 
        };
      }
    }
  }

}


