import {Component, OnInit} from '@angular/core';
import {EjercicioService} from "../../../services/ejercicio/ejercicio.service";
import {Ejercicio} from "../../../modelos/ejercicio";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import { environment } from '../../../../environments/environment';
import {TagModule} from "primeng/tag";
import {BadgeModule} from "primeng/badge";
import {ChipModule} from "primeng/chip";
import {LoginService} from "../../../services/auth/authService/login.service";
import {Router, RouterLink} from "@angular/router";
import {UserInterface} from "../../../services/user/user-interface";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    ChipModule,
    RouterLink,
    PaginatorModule
  ],
  providers: [
    EjercicioService,
    LoginService
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss'
})
export class DataViewComponent implements OnInit{
  ejercicios!: Ejercicio[];
  isLogged: Boolean = false;
  userData?: String;
  protected sessionUser?: UserInterface | null

  constructor(private ejercicioService: EjercicioService, private authService: LoginService, private router: Router) {}

  deleteInDataView(id: string): void {
    this.ejercicioService.removeEjercicio(id).subscribe(() => {
      this.ejercicios = this.ejercicios.filter(ejercicio => ejercicio.id !== id);
    });
  }

  ngOnInit(): void {
      this.ejercicioService.getEjercicios().forEach((ejercicio) => {
        this.ejercicios = ejercicio;
        console.log(this.ejercicios);
      })

    this.authService.currentSession.subscribe(
      {
        next:(currentSession) => {
          this.isLogged = currentSession;
        }
      }
    )

    this.authService.sessionData.subscribe(
      {
        next:(sessionData) => {
          this.userData = sessionData;
        }
      }
    )
    this.authService.sessionUser.subscribe(
      {
        next:(sessionUser) => {
          this.sessionUser = sessionUser;
        }
      }
    )
  }


  getDificultad (ejercicio: Ejercicio) {
    switch (ejercicio.dificultad.nomDificultad) {
      case 'PRINCIPIANTE':
        return 'success';

      case 'MEDIO':
        return 'warning';

      case 'AVANZADO':
        return 'danger';

      default:
        return undefined;
    }
  };

  protected readonly environment = environment;
}
