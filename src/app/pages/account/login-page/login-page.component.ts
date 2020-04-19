import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {

    this.refreshToken();

  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        this.toastr.success(null, "Autenticação realizada com sucesso!")
        this.setUser(data.customer, data.token);
        this.busy = false;
        
      },
        (err) => {
          this.busy = false;
          this.toastr.error(err.message, "Não foi possível autenticar");
          
        }
      );
  }

  refreshToken() {
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this
        .service
        .refreshToken()
        .subscribe((data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
          (err) => {
            localStorage.clear();
            this.busy = false;
          }
        );
    }
  }

  setUser(user, token) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
