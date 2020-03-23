import { Component, OnInit, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'app-home-page-content',
    templateUrl: './home-page-content.component.html',
    styleUrls: ['./home-page-content.component.scss']
})
export class HomePageContentComponent implements OnInit {

    constructor(
        private changeDetectorRef : ChangeDetectorRef
    ) {

    }

    show : boolean[] = new Array();

    components

    @ViewChildren('scrollSpy')
    set _components(content) {
        this.components = content;

        this.show = new Array(this.components.length);

        this.checkShowElements();
    }




    ngOnInit(): void {

        let container : any = document.querySelector('body > app-root > app-home-page > mat-sidenav-container > mat-sidenav-content')


        container.onscroll = () => {
            this.checkShowElements();            
        }


    }
    

    checkShowElements() {
        let container : any = document.querySelector('body > app-root > app-home-page > mat-sidenav-container > mat-sidenav-content')

        const offsetHeight = container.offsetHeight;


        this.components._results.forEach((el, i) => {
            
            const boudingTop = el.nativeElement.getBoundingClientRect().top;

            if(boudingTop < offsetHeight / 2) {
                this.show[i] = true;
            } else {
                this.show[i] = false;
            }

            this.changeDetectorRef.detectChanges()
        })

        

    }
    
}
