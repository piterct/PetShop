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
import  Swal  from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = Security.getToken();
    
     const  newRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      });

      console.log(request);
      console.log(newRequest);
 
debugger;

    return next.handle(newRequest).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
          debugger;
        if (err.status !== 401) {
         return;
        }
        Security.clear();    
        this.alertExpirateSession();
      }
    }));
  }

   alertExpirateSession(){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Sua sessão foi expirada!',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#ff8429'
    }).then((result) => {
      if(result.value){
        this.redirectForLogin();
      }
    })
   }

   redirectForLogin()
   {    
      this.router.navigate(['/login']); 
   }

}