import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    public urlDefault = location.origin;
    public url = 'http://localhost:3000/v1';
    constructor(private http: HttpClient) { }

    getProducts() {
        debugger;
        return this.http.get<Product[]>(`${this.url}/products`);
    }

    authenticate(data) {
        return this.http.post(`${this.url}/accounts/authenticate`, data);
    }
}