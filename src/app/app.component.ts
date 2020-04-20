import { Component } from '@angular/core';
import { Security } from './utils/security.util';
import { DataService } from './services/dataservices/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private router: Router, private service: DataService) {

    //this.validateToken();

  }

  validateToken() {
    const token = Security.getToken();
    if (token) {
      this
        .service
        .refreshToken()
        .subscribe((data: any) => {
          this.setUser(data.customer, data.token);
        },
          (err) => {
            localStorage.clear();
          }
        );
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  setUser(user, token) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}




