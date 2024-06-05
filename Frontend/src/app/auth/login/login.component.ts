import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {InputIconModule} from "primeng/inputicon";
import {IconFieldModule} from "primeng/iconfield";
import {CardModule} from "primeng/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FloatLabelModule, ReactiveFormsModule, InputTextModule, FormsModule, ButtonModule, PasswordModule, InputIconModule, IconFieldModule, CardModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  get username(): string | undefined {
    return this._username;
  }

  set username(value: string | undefined) {
    this._username = value;
  }
  get password(): string | undefined {
    return this._password;
  }

  set password(value: string | undefined) {
    this._password = value;
  }


  private _password: string | undefined;
  private _username: string | undefined;

  loginForm = this.formBuilder.group({
    email: ['felisucojunior@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) { }
}


