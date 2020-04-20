import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Security } from '../utils/security.util';
import { tap, delay } from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private urlDefault = environment.apiUrl;
    public apiUrl = 'http://localhost:3000/v1';
    constructor(private http: HttpClient) { }

   // public composeHeaders() {
   //     const token = Security.getToken();
   //     const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
     //   return headers;
  ///  }

    getProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    authenticate(data) {
       debugger;
        return this.http.post(`${this.apiUrl}/accounts/authenticate`, data);
    }
    refreshToken() {
        return this.http.post(`${this.apiUrl}/accounts/refresh-token`,
            null
           // ,{ headers: this.composeHeaders() });
    }

    create(data) {
        return this.http.post(`${this.apiUrl}/accounts`, data);
    }

    resetPassword(data) {
        return this.http.post(`${this.apiUrl}/accounts/reset-password`, data);
    }

    getProfile() {
        return this.http.get(`${this.apiUrl}/accounts`
        //, { headers: this.composeHeaders() });
    }

    updateProfile(data) {
        return this.http.put(`${this.apiUrl}/accounts`, data
        //, { headers: this.composeHeaders() });
    }
}