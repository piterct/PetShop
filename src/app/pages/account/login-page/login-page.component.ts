import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService, private fb: FormBuilder) {
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
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.refreshToken();
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

  refreshToken() {
    this.busy = true;
    this.service.refreshToken()
      .subscribe((data: any) => {
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
        (err) => {
          localStorage.clear();
          this.busy = true;
        }
      );
  }

}
