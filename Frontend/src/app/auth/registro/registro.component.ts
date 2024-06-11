import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {UserInterface} from "../../services/user/user-interface";
import {LoginInterface} from "../../services/auth/authService/login-interface";
import {RegistroInterface} from "../../services/auth/authService/registro-interface";
import {LoginService} from "../../services/auth/authService/login.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

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
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {

  registrarForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(12), Validators.maxLength(70)]],
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).*$/)]],
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  })

  get username(){
    return this.registrarForm.get('username');
  }

  get password(){
    return this.registrarForm.get('password');
  }

  get email(){
    return this.registrarForm.get('email');
  }

  get nombre(){
    return this.registrarForm.get('nombre');
  }

  showError(detail: string = 'Vuelva a intentarlo') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  registrar(){
    if(this.registrarForm.valid){
      this.loginService.registro(this.registrarForm.value as RegistroInterface).subscribe(
        {
          next: (data) => {
            console.log(data)
          },
          error: (error) => {
            this.showError(error);
          },
          complete: () => {
            console.log('Login completado');
            this.router.navigateByUrl('/landing');
            this.registrarForm.reset();
            this.showSuccess();
          }
        }
      )
    }else {
      this.registrarForm.markAllAsTouched();
    }
  }

  // login(){
  //   if(this.loginForm.valid){
  //     this.loginService.login(this.loginForm.value as LoginInterface).subscribe({
  //       next: (data) => {
  //         console.log(data)
  //       },
  //       error: (error) => {
  //         this.showError();
  //         console.log(error)
  //       },
  //       complete: () => {
  //         console.log('Login completado');
  //         this.router.navigateByUrl('/landing');
  //         this.loginForm.reset();
  //         this.showSuccess();
  //       }
  //     });
  //
  //   }else {
  //     this.loginForm.markAllAsTouched();
  //   }

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private messageService: MessageService) { }


}
