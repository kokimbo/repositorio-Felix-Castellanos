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
import {EjercicioService} from "../../services/ejercicio/ejercicio.service";
import {CountService} from "../../services/user/count.service";

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
  count: number = 0;
  countString: string = "";
  userData?: String;
  protected sessionUser?: UserInterface | null

  constructor(private countService: CountService, private ejercicioService: EjercicioService, private loginService: LoginService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) {

  }

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
    this.loginService.currentSession.subscribe({
      next: (currentSession) => {
        this.isLogged = currentSession;
        if (this.isLogged && this.sessionUser?.id) {
          this.fetchExerciseCount(this.sessionUser.id);
        }
      }
    });

    this.loginService.sessionData.subscribe({
      next: (sessionData) => {
        this.userData = sessionData;
      }
    });

    this.loginService.sessionUser.subscribe({
      next: (sessionUser) => {
        this.sessionUser = sessionUser;
        if (this.isLogged && this.sessionUser?.id) {
          this.fetchExerciseCount(this.sessionUser.id);
        }
      }
    });

    this.countService.contador$.subscribe(
      {
        next: (count) => {this.count = count}
      }
    )

    if (this.loginService.isAuthenticated() && this.sessionUser?.id) {
      this.fetchExerciseCount(this.sessionUser.id);
    }
  }

  private fetchExerciseCount(userId: string): void {
    this.ejercicioService.getCountEjercicios(userId).subscribe({
      next: (count) => {
        this.count = count;
        this.countService.contador.next(count);
      },
      error: (err) => {
        console.error('Error fetching exercise count:', err);
      }
    });
  }

  protected readonly environment = environment;
}
