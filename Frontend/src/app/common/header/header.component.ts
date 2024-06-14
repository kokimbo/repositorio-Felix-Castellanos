import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {LoginService} from "../../services/auth/authService/login.service";
import {UserInterface} from "../../services/user/user-interface";
import {ConfirmationService, MessageService} from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from "primeng/toast";
import {ChipModule} from "primeng/chip";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, NgOptimizedImage, NgStyle, RouterLink, AvatarModule, BadgeModule, ConfirmDialogModule, ToastModule, ChipModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isLogged: Boolean = false;
  userData?: String;
  protected sessionUser?: UserInterface | null

  constructor(private loginService: LoginService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  // ngOnDestroy(): void {
  //   this.authService.currentSession.unsubscribe();
  //   this.authService.currentSessionData.unsubscribe()
  // }

  confirmar() {
    this.confirmationService.confirm({
      header: '¿Estas seguro de que quieres cerrar sesion?',
      message: 'Confirma la accion de cerrar sesion',

      accept: () => {
        this.messageService.add({ severity: 'error', summary: '¡Adiós!', detail: 'Has cerrado sesion', life: 3000 });
        this.loginService.logout();
        this.router.navigateByUrl('/login');
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '¡Te has quedado!', detail: 'Has cancelado cerrar la sesion', life: 3000 });
      }
    });
  }

  ngOnInit(): void {
    this.loginService.currentSession.subscribe(
      {
        next:(currentSession) => {
          this.isLogged = currentSession;
        }
      }
    )

    this.loginService.sessionData.subscribe(
      {
        next:(sessionData) => {
          this.userData = sessionData;
        }
      }
    )
    this.loginService.sessionUser.subscribe(
      {
        next:(sessionUser) => {
          this.sessionUser = sessionUser;
        }
      }
    )
  }

  protected readonly environment = environment;
}
