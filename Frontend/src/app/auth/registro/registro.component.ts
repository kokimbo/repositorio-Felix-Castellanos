import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
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

//Aqui va a haber mas campos
  private _password: string | undefined;
  private _username: string | undefined;

  //Aqui igual, va a haber mas campos
  registroForm = this.formBuilder.group({
    email: ['felisucojunior@gmail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) { }
}
