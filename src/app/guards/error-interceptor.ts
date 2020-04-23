import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Security } from '../utils/security.util';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        return next.handle(request).pipe(catchError(err => {
            debugger;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                Security.clear();
                this.alertExpirateSession();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    
    alertExpirateSession() {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Sua sessão foi expirada!',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#ff8429'
        }).then((result) => {
            if (result.value) {
                this.redirectForLogin();
            }
        })
    }

    redirectForLogin() {
        this.router.navigate(['/login']);
    }

}

