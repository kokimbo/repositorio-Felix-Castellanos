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
import {Router} from "@angular/router";
import {LoginService} from "../../services/auth/authService/login.service";
import {LoginInterface} from "../../services/auth/authService/login-interface";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    InputIconModule,
    IconFieldModule,
    CardModule,
    RouterLink,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private messageService: MessageService) { }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  showError(detail: string = 'Vuelva a intentarlo') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginInterface).subscribe({
        next: (data) => {
          console.log(typeof data)
          console.log(data)
        },
        error: (error) => {
          this.showError(error);
          console.log(error)
        },
        complete: () => {
          console.log('Login completado');
          this.router.navigateByUrl('/landing');
          this.loginForm.reset();
          this.showSuccess();
        }
      });

    }else {
      this.loginForm.markAllAsTouched();
    }
  }
}


