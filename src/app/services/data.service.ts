import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';;


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiUrl = environment.apiUrl;
    private token = Security.getToken();
    //public apiUrl = 'http://localhost:3000/v1';

    constructor(private http: HttpClient) { }


    getProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    refreshToken() {
        return this.http.post(`${this.apiUrl}/accounts/refresh-token`, null);
    }

    create(data) {
        return this.http.post(`${this.apiUrl}/accounts`, data);
    }

    resetPassword(data) {
        return this.http.post(`${this.apiUrl}/accounts/reset-password`, data);
    }

    getProfile() {
        return this.http.get(`${this.apiUrl}/accounts`);
    }

    updateProfile(data) {
        return this.http.put(`${this.apiUrl}/accounts`, data);
    }
}