import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private service: DataService, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(11),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.refreshToken();
    }
  }

  submit() {
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        localStorage.setItem('petshop.token', data.token);
        console.log(data);
      },
        (err) => {
          console.log(err)
        }
      );
  }

  refreshToken() {
    console.log('Autenticando');
    this.service.refreshToken()
      .subscribe((data: any) => {
        localStorage.setItem('petshop.token', data.token);
        console.log(data);
      },
        (err) => {
          localStorage.clear();
        }
      );
  }

}
