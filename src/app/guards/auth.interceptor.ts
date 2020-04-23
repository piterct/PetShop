import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Security } from '../utils/security.util';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const token = Security.getToken();
    const newRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    });

    return next.handle(newRequest);

  }

}