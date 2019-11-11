import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './security/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl : string = 'http://localhost:3000';
    graphEndpoint : string = 'graphql';


    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

    }


    async post(uri, body, headers = {}) : Promise<any> {

        var response = await this.http.post(
            `${this.apiUrl}/${uri}`,
            body,
            {
                headers: headers
            }
        ).toPromise();

        return response;
    }

    async graphqlQuery(queryString : string) {

        const usuarioLogado = this.authService.usuarioLogado.value;

        let headers;

        if(usuarioLogado == null) {
            headers = {}
        } else {
            headers = {
                "Authorization": `Bearer ${usuarioLogado.usuario.jwt}`
            }
        }

        return await this.post(
            this.graphEndpoint, 
            {
                query: queryString,
            },
            headers
        );
    }

    async graphqlMutation (mutationString: string) {

        const usuarioLogado = await this.authService.usuarioLogado.value;

        let headers;

        if(usuarioLogado == null) {
            headers = {}
        } else {
            headers = {
                "Authorization": `Bearer ${usuarioLogado.usuario.jwt}`
            }
        }

        return await this.post(
            this.graphEndpoint, 
            {
                query: mutationString,
            },
            headers
        );

    }
}
