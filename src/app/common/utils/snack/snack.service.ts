import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackComponent } from './snack.component';

@Injectable({
    providedIn: 'root'
})
export class SnackService {

    constructor(
        private snack_bar: MatSnackBar
    ) { }

    /**
     * Abre uma snack bar de acordo com uma das três gravidades possíveis aceitadas.
     * 
     * @param message   por padrão é 'ok'
     * @param gravidade por padrão é 'success' mas pode ser 'danger' (vermelho) e 'warn' (amarelo)
     * @param duration  por padrão é 5000
     */
    async open_snack_bar(
        message: string = 'ok',
        gravidade: string = 'success',
        duration: number = 5000,
        action: string = null,
    ) : Promise<boolean> {
        const ref = this.snack_bar.open(message, action, {
            duration: duration
        });

        const ret = await ref.afterDismissed().toPromise();
        return ret.dismissedByAction;
        

        // this.snack_bar.openFromComponent(SnackComponent, {
        //     data: {
        //         message,
        //         style: gravidade
        //     },
        //     duration
        // });

    }

}
