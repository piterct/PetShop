import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Security } from '../utils/security.util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = Security.getToken();
    debugger;
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      });
 
      console.log('Entrou no Intercept');

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
          debugger;
        if (err.status !== 401) {
         return;
        }
        this.router.navigate(['login']);
      }
    }));
  }
}