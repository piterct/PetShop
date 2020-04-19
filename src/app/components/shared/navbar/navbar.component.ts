import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
  public user: User;

  constructor(private router: Router, private toastr: ToastrService) {


  }

  ngOnInit(): void {
    this.user = Security.getUser();
  }

  logout() {
    Security.clear();
    this.toastr.info(null, "Logout realizado com sucesso!");
    this.router.navigate(['/login']);
  }

}
