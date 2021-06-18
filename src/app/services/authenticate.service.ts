import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';;

@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    private apiUrl = environment.apiUrl;
    private token = Security.getToken();
    //public apiUrl = 'http://localhost:3000/v1';

    constructor(private http: HttpClient) { }

    authenticate(data: any) {
        return this.http.post(`${this.apiUrl}/accounts/autenticar`, data);
    }
/* 
    example using request with headers
    authenticate(data: any) {
        return this.http.post(`${this.apiUrl}/accounts/autenticar`, data, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        });
    } */
}